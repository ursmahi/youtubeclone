"use client"
import React from "react";
import IconsSearch from "../icon-components/IconsSearch";
const SmallSearchSuggestions = ({ searchSuggest }) => {
    return (
      <div className="w-full flex items-center bg-white p-3 h-10 hover:bg-gray-100 shadow-md hover:cursor-pointer"
      >
        <IconsSearch className="text-2xl font-semibold" />
        <p className="w-full pl-3 outline-none text-lg font-semibold">
          {searchSuggest}
        </p>
      </div>
  );
};

export default SmallSearchSuggestions;
