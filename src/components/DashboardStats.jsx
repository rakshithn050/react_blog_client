import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaBookOpen, FaCommentAlt, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardStats() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthLikes, setLastMonthLikes] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    if (currentUser && currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const [usersResponse, postsResponse, commentsResponse] =
        await Promise.all([
          axios.get(`/api/user/getUsers?page=1&perPage=5`),
          axios.get(`/api/post/getPosts?page=1&perPage=5`),
          axios.get(`/api/comment/getAllComments?page=1&perPage=10`),
        ]);

      if (usersResponse.status === 200) {
        const { users, totalUsers, lastMonthUsers } = usersResponse.data;
        setUsers(users);
        setTotalUsers(totalUsers);
        setLastMonthUsers(lastMonthUsers);
      }

      if (postsResponse.status === 200) {
        const { posts, totalPosts, lastMonthPosts } = postsResponse.data;
        setPosts(posts);
        setTotalPosts(totalPosts);
        setLastMonthPosts(lastMonthPosts);
      }

      if (commentsResponse.status === 200) {
        const {
          comments,
          totalComments,
          totalLikes,
          lastMonthComments,
          lastMonthLikes,
        } = commentsResponse.data;
        setComments(comments);
        setTotalComments(totalComments);
        setTotalLikes(totalLikes);
        setLastMonthComments(lastMonthComments);
        setLastMonthLikes(lastMonthLikes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return "N/A";
    const change = ((current - previous) / previous) * 100;
    return `${change.toFixed(2)}%`;
  };

  return (
    <div className="p-10 w-full">
      {loading && (
        <div className="flex h-screen justify-center items-center flex-1">
          <Spinner size="lg" />
        </div>
      )}
      <div className={loading ? "hidden" : ""}>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <FaBookOpen className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Posts
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalPosts}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong
                  className={`${
                    totalPosts === lastMonthPosts
                      ? "text-gray-500"
                      : totalPosts > lastMonthPosts
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {calculatePercentageChange(totalPosts, lastMonthPosts)}
                </strong>
                &nbsp;than last month
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <FaUsers className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Users
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalUsers}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong
                  className={`${
                    totalUsers === lastMonthUsers
                      ? "text-gray-500"
                      : totalUsers > lastMonthUsers
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {calculatePercentageChange(totalUsers, lastMonthUsers)}
                </strong>
                &nbsp;than last month
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <FaCommentAlt className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Comments
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalComments}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong
                  className={`${
                    totalComments === lastMonthComments
                      ? "text-gray-500"
                      : totalComments > lastMonthComments
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {calculatePercentageChange(totalComments, lastMonthComments)}
                </strong>
                &nbsp;than last month
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <BiLike className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Interactions
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalLikes}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong
                  className={`${
                    totalLikes === lastMonthLikes
                      ? "text-gray-500"
                      : totalLikes > lastMonthLikes
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {calculatePercentageChange(totalLikes, lastMonthLikes)}
                </strong>
                &nbsp;than last month
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium dark:text-white">All Users</div>
                <div>
                  <Link to={"/dashboard?tab=users"}>
                    <Button
                      type="button"
                      gradientMonochrome="info"
                      outline
                      className="text-gray-400 hover:text-white"
                    >
                      More...
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Profile Picture
                      </th>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Username
                      </th>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        className="text-gray-700 dark:text-gray-100"
                        key={user._id}
                      >
                        <th className="border-b border-b-gray-50 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          <img
                            src={user.profilePicture}
                            alt="Profile Image"
                            className="w-10 h-10 object-cover rounded-full bg-gray-500"
                          />
                        </th>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {user.username}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="dark:bg-gray-800  shadow-md shadow-black/5 p-6 rounded-md">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium dark:text-white">Recent Posts</div>
              <div>
                <Link to={"/dashboard?tab=posts"}>
                  <Button
                    type="button"
                    gradientMonochrome="info"
                    outline
                    className="text-gray-400 hover:text-white"
                  >
                    More...
                  </Button>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="items-center w-full  border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Image
                    </th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Title
                    </th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Category
                    </th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px min-w-140-px">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <img
                          src={post.image}
                          alt="Profile Image"
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        />
                      </th>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {post.title}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="dark:bg-gray-800  shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium dark:text-white">Recent Comments</div>
            <div>
              <Link to={"/dashboard?tab=comments"}>
                <Button
                  type="button"
                  gradientMonochrome="info"
                  outline
                  className="text-gray-400 hover:text-white"
                >
                  More...
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Post ID
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    User ID
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Comment
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Total Likes
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px min-w-140-px">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <span className="text-[13px] font-medium text-gray-400">
                        {comment.postID}
                      </span>
                    </th>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {comment.userID}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {comment.comment}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {comment.numberOfLikes}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
