import React, { useState } from "react";
import { Classes } from "../components/common/Classes";
import { AsideCourses } from "../components/common/AsideCourses";
import { Search } from "../components/common/Search";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Find Class */}
      <section className="w-5/6 m-auto p-4 mb-2">
        <div className="text-2xl">
          <span>Find </span>
          <span className="text-orange-400">Class</span>
        </div>
        <div className="mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>
      </section>

      {/* Conditional Rendering Based on Search */}
      {isSearching ? (
        <section className="w-11/12 m-auto mt-6">
          <Search query={searchQuery} />
        </section>
      ) : (
        <section className="flex flex-col w-11/12 m-auto gap-6  lg:flex-row-reverse ">
          {/* Courses Section */}
          <div className="lg:w-2/6 w-full order-1 lg:order-2">
            <AsideCourses />
          </div>

          {/* Classes Section */}
          <div className="lg:w-4/6 w-full order-2 lg:order-1">
            <Classes />
          </div>
        </section>
      )}
    </>
  );
};
