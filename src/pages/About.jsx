import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="px-3 md:px-4 py-12 flex flex-col justify-center items-center">
      <div role="img" aria-label="Logo">
        <img
          src="https://img.freepik.com/free-vector/geometric-leaves-logo-business-template_23-2148707652.jpg?w=740&t=st=1718532568~exp=1718533168~hmac=251fd52394c242e2a7c3b6d85d72ed9b8ef91ad402d057bb159856ec153e5c"
          className="h-9"
          alt="Logo"
        />
      </div>
      <h1 className="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-center text-gray-800 text-center md:w-9/12 lg:w-7/12 dark:text-white">
        About This Blog
      </h1>
      <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">
        Welcome to My Blog App! This blog serves as a platform for me to share
        my insights and perspectives with the broader tech community. As a
        seasoned software engineer, I hold a deep passion for technology,
        development, and exploring the intricacies of the digital landscape.
      </p>
      <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">
        This blog delves into the realms of web development, software
        engineering, and the versatile world of programming languages. I aim to
        deliver informative content, practical tutorials, and thought-provoking
        discussions that will resonate with individuals who share my enthusiasm
        for the tech sphere.
      </p>
      <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">
        I encourage you to actively participate in our community by leaving
        thoughtful comments on our posts and engaging in discussions with fellow
        readers. We foster an environment of open dialogue and mutual learning,
        believing that collective insights can propel us all towards greater
        understanding and growth in the ever-evolving world of technology.
      </p>
      <div className="mt-12 md:mt-14 w-full flex justify-center">
        <Link to={"/register"}>
          <Button
            type="button"
            size="md"
            gradientDuoTone="purpleToPink"
            outline
          >
            Discover More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
