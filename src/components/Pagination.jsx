import React from "react";
import { Button } from "flowbite-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex justify-center my-5">
      <div className="flex rounded-md gap-2">
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`text-sm font-medium ${
              currentPage === page
                ? "text-white bg-blue-500"
                : "text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
