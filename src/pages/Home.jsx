import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import axios from "axios";
import RecentArticles from "../components/RecentArticles";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/post/getPosts?page=${page}&perPage=6`);
      if (res.status === 200) {
        const { posts } = res.data;
        setPosts(posts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-24">
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/free-vector/geometric-leaves-logo-business-template_23-2148707652.jpg?w=740&t=st=1718532568~exp=1718533168~hmac=251fd52394c242e2e2a7c3b6d85d72ed9b8ef91ad402d057bb159856ec153e5c"
                className="h-9"
                alt="Flowbite React Logo"
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl">
                Welcome to My Blog App
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Explore the latest articles on Web Development, Trending
                Technologies, and many more. This app provides insightful
                content to keep you informed and inspired. Whether you're a
                seasoned reader or new to this application, there's something
                here for everyone.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-x-2 gap-y-2">
                <Link to={"/register"}>
                  <Button
                    type="button"
                    size="md"
                    gradientDuoTone="purpleToBlue"
                  >
                    Read Blogs
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    type="button"
                    size="md"
                    gradientDuoTone="purpleToPink"
                    outline
                  >
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 sm:mx-10">
        <CallToAction />
      </div>

      <section className="bg-white dark:bg-gray-900 border rounded-xl p-5 m-4 sm:m-10">
        <h2 className="order-1 lg:order-1 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl mt-4 my-10 lg:ml-10">
          Explore Recent Articles
        </h2>
        <div className="px-2 flex flex-col lg:flex-row lg:items-center">
          <RecentArticles className="order-2 lg:order-2" articles={posts} />
        </div>
      </section>
    </>
  );
};

export default Home;
