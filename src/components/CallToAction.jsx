import { Button } from "flowbite-react";
import React from "react";

function CallToAction() {
  return (
    <section className="bg-white dark:bg-gray-900 border rounded-xl p-5 my-5">
      <div className="px-2 lg:flex lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="my-10 lg:my-0 lg:px-10">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              Join Our Blogging Community
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Discover insightful articles, share your thoughts, and connect
              with like-minded individuals. Stay updated with the latest trends
              and stories in the blogging world.
            </p>
            <div className="mt-8 max-w-xl">
              <Button
                type="button"
                size="md"
                gradientDuoTone="purpleToBlue"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
            alt="ManWith Laptop"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
