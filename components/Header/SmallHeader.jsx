"use client";
import React, { useState } from "react";
import IconsUser from "../icon-components/IconsUser";
import IconsSearch from "../icon-components/IconsSearch";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import IconsBack from "../icon-components/IconsBack";
import IconsMic from "../icon-components/IconsMic";
import SmallSearchSuggestions from "./SmallSearchSuggestions";
const SmallHeader = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestionsList, setSearchSuggestionsList] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const sendSearchRequest = () => {
    if (searchQuery.length >= 3) {
      setSearchSuggestionsList([])
      router.push(`/search?query=${searchQuery}`)
    }
  };
  const getSearchTypingSuggestions = async (searchKey) => {
    const suggestion = await fetch(
      `youtube/searchSuggestions?query=${searchKey}`
    );
    const suggestData = await suggestion.json();
    setSearchSuggestionsList(suggestData);
  };

  return (
    <>
      <div className="h-18 grid items-center grid-cols-12 p-2 pt-4 pb-4">
        {!activeSearch && (
          <div className="col-span-3 flex items-center ml-2">
            <Link href="/">
              <Image
                src="/assets/youtube-logo.png"
                className="w-fit h-fit"
                width={1000}
                height={1000}
                alt="Youtube"
                priority={true}
              />
            </Link>
          </div>
        )}
        <div
          className={`${
            !activeSearch ? "col-span-7" : "col-span-10"
          } flex justify-end`}
        >
          {activeSearch && (
            <button
              onClick={() => {
                setActiveSearch(false);
                setSearchSuggestionsList([]);
                setSearchQuery("");
              }}
            >
              <IconsBack className="h-10 w-10 opacity-70" />
            </button>
          )}
          {activeSearch && (
            <div className="w-full border border-gray-400 p-1 rounded-full focus-within:border-blue-500 h-10">
              <input
                placeholder="search"
                className="w-full pl-3 outline-none text-lg"
                value={searchQuery}
                onChange={(e) => {
                  let searchTerm = e.target.value;
                  setSearchQuery(searchTerm);
                  if (searchTerm.length >= 3) {
                    getSearchTypingSuggestions(searchTerm);
                  } else {
                    setSearchSuggestionsList([]);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendSearchRequest();
                  }
                  if (event.key === "Escape") {
                    setSearchSuggestionsList([]);
                  }
                }}
              />
            </div>
          )}
          {!activeSearch && (
            <button
              onClick={() => {
                //   sendSearchRequest();
                setActiveSearch(true);
              }}
              className="w-14 flex justify-center items-center"
            >
              <IconsSearch className="w-8 h-8" />
            </button>
          )}
        </div>
        <div className="col-span-2 flex justify-end ">
          {activeSearch ? (
            <IconsMic className="h-10 w-10 opacity-70 hover:opacity-95 rounded-full bg-gray-200" />
          ) : (
            <IconsUser className="h-10 w-10 opacity-70 hover:opacity-95 " />
          )}
        </div>
      </div>
      <div className="fixed  w-full  ">
        {searchSuggestionsList.map((item, index) => {
          return (
            <Link href={`/search?query=${item}`} key={index}>
              <div
                className="bg-transparent flex flex-col justify-center items-center"
                onClick={() => {
                  setSearchSuggestionsList([]);
                  redirect("/");
                  // (`/search?query=${item}`);
                }}
              >
                <SmallSearchSuggestions searchSuggest={item} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SmallHeader;
