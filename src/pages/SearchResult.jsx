import React, { useEffect, useState } from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { useLocation } from "react-router-dom";
import RecentArticles from "../components/RecentArticles";
import axios from "axios";
import Pagination from "../components/Pagination";

const SearchResult = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    order: "desc",
    category: "uncategorized",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("searchTerm");
    const order = urlParams.get("sort") || "desc";
    const category = urlParams.get("category") || "uncategorized";
    setSearchData({
      ...searchData,
      searchTerm: searchQuery,
      order,
      category,
    });
    fetchPosts(1);
  }, [location]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const { searchTerm, order, category } = searchData;
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const url = `/api/post/getPosts?searchTerm=${encodedSearchTerm}&order=${order}&category=${category}&page=${page}&perPage=3`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const { posts, totalPages: fetchedTotalPages } = res.data;
        setResults(posts);
        setTotalPages(fetchedTotalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  const handleSearchInputChange = (event) => {
    setSearchData({
      ...searchData,
      searchTerm: event.target.value,
    });
  };

  const handleSortChange = (event) => {
    setSearchData({
      ...searchData,
      order: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    setSearchData({
      ...searchData,
      category: event.target.value,
    });
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-2 py-10 lg:px-10 2xl:px-16 grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full md:col-span-1 xl:col-span-1 order-2 md:order-1">
          <h1 className="text-xl font-bold mb-4 dark:text-white">
            Search Filter
          </h1>
          <form
            className="flex flex-col items-start"
            onSubmit={(e) => {
              e.preventDefault();
              fetchPosts(1);
            }}
          >
            <TextInput
              placeholder="Search..."
              className="mb-4 w-full md:w-80"
              value={searchData.searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <div className="mb-4 md:mr-4">
                <label
                  htmlFor="sort"
                  className="mb-2 block font-semibold dark:text-white"
                >
                  Sort Posts By
                </label>
                <Select
                  id="sort"
                  value={searchData.order}
                  onChange={handleSortChange}
                >
                  <option value="desc">Latest</option>
                  <option value="asc">Oldest</option>
                </Select>
              </div>
              <div className="mb-4 md:mr-4">
                <label
                  htmlFor="category"
                  className="mb-2 block font-semibold dark:text-white"
                >
                  Select Category
                </label>
                <Select
                  id="category"
                  value={searchData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="uncategorized">Select a Category</option>
                  <option value="js">Javascript</option>
                  <option value="python">Python</option>
                  <option value="react">React JS</option>
                  <option value="node">Node JS</option>
                </Select>
              </div>
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Search
            </Button>
          </form>
        </div>

        <div className="w-full md:col-span-2 xl:col-span-2 order-1 md:order-2">
          <div className="rounded-lg border-2 border-dashed p-5 flex flex-col items-center">
            {loading ? (
              <div className="h-80 w-full flex items-center justify-center">
                Loading...
              </div>
            ) : results.length > 0 ? (
              <RecentArticles articles={results} />
            ) : (
              <div className="h-80 w-full">No Matching Articles Found</div>
            )}
            {results.length > 0 && (
              <div className="self-end mb-5 mr-5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
