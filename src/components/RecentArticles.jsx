import { Badge } from "flowbite-react";
import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { TbTag } from "react-icons/tb";

function RecentArticles({ articles = [] }) {
  return (
    <div
      className="bg-cover w-full flex justify-center items-center"
      style={{ backgroundImage: "url('/images/mybackground.jpeg')" }}
    >
      <div className="w-full bg-opacity-40 backdrop-filter backdrop-blur-lg">
        <div className="w-12/12 mx-auto rounded-2xl bg-opacity-40 backdrop-filter backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
            {articles.map((article) => (
              <article
                className="p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
                key={article._id}
              >
                <a
                  target="_self"
                  href="/blog/slug"
                  className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
                ></a>
                <div className="relative mb-4 rounded-2xl">
                  <img
                    className="h-48 w-full rounded-2xl object-cover transition-transform duration-300 transform group-hover:scale-105"
                    src={article.image}
                    alt="Article Thumbnail"
                  />
                  <a
                    className="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                    href={`/post/${article.slug}`}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2 dark:text-white">Read article</span>
                    <MdOutlineKeyboardDoubleArrowRight className="mt-1" />
                  </a>
                </div>
                {/* <div className="flex justify-between items-center w-full pb-4 mb-auto">
                  <div className="flex items-center">
                    <div className="pr-3">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Author"
                      />
                    </div>
                    <div className="flex flex-1">
                      <div className="">
                        <p className="text-sm font-semibold">
                          Morris Muthigani
                        </p>
                        <p className="text-sm text-gray-500">
                          Published on 19/03/2024
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="text-sm flex items-center text-gray-500">
                      2 Days ago
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div> */}
                <h3 className="font-medium text-xl leading-8">
                  <a
                    href={`/post/${article.slug}`}
                    className="block relative group-hover:text-red-700 transition-colors duration-200 dark:text-white"
                  >
                    Instant Help at Your Fingertips
                  </a>
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge icon={TbTag}>{article.category}</Badge>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentArticles;
