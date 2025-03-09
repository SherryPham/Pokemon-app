"use client";
import { useGlobalContext } from "@/context/globalContext";
import { search } from "@/utils/Icons";
import React from "react";

function SearchForm() {
  const { searchQuery, handleSearchChange } = useGlobalContext();

  return (
    <form className="relative w-[80%] md:w-[50%]">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Pokemon!"
        className="u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800"
      />
      <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none">
        {search}
      </span>
    </form>
  );
}

export default SearchForm;
