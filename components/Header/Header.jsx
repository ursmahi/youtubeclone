"use client"
import React, { useState } from "react";
import IconsMenu from "../icon-components/IconsMenu";
import IconsUser from "../icon-components/IconsUser";
import IconsSearch from "../icon-components/IconsSearch";
import { useDispatch, useSelector } from "react-redux";
import { toogleMenu, toogleWatchMenu } from "../../utils/redux/appSlice";
import Link from "next/link";
import Image from "next/image";
import {redirect, useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

import SearchSuggestions from "./SearchSuggestions";
const Header = () => {
    const path = usePathname()
    const router = useRouter()

//   const location = useLocation();
//   const navigate = useNavigate();
  const menuState = useSelector((store) => store.app.isOpen);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestionsList, setSearchSuggestionsList] = useState([]);
  const handleMenu = () => {
    // console.log(`path : ${path}`);
    // console.log(menuState);
    if (path === "/" && (menuState === "homeOn" || menuState === "homeOff")) {
      dispatch(toogleMenu());
    }
    if (path === "/search" || path === "/trending") {
      dispatch(toogleMenu());
    }
    if (path === "/watch" && menuState === "watchOn") {
      dispatch(toogleWatchMenu("watchOff"));
    }
    if (path === "/watch" && menuState === "watchOff") {
      dispatch(toogleWatchMenu("watchOn"));
    }
  };
  const sendSearchRequest = () => {
    if (searchQuery.length >= 3) {
      setSearchSuggestionsList([])
      router.push(`/search?query=${searchQuery}`)
    }
  };
  const getSearchTypingSuggestions = async (searchKey) => {
    const suggestion = await fetch(`youtube/searchSuggestions?query=${searchKey}`)
    const suggestData = await suggestion.json()
    setSearchSuggestionsList(suggestData)
  };
  return (
    <>
      <div className="h-18 grid items-center grid-cols-12 p-2 pt-4 pb-4">
        <div className="col-span-3 flex items-center ml-6">
          <IconsMenu
            className="h-8 w-6 mr-6 hover:cursor-pointer"
            onClick={() => {
              handleMenu();
            }}
          />
          <Link href="/">
            <Image  src='/assets/youtube-logo.png' className="w-24 h-6" width={1000} height={1000} alt="Youtube" priority={true} /> 
          </Link>
        </div>
        <div className="col-span-7 flex justify-center">
          <div className="w-9/12 border border-gray-400 p-1 rounded-l-full focus-within:border-blue-500 h-10">
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
          <button
            onClick={() => {
              sendSearchRequest();
            }}
            className="rounded-r-full w-14 flex justify-center items-center border border-gray-400 hover:border-gray-500 opacity-50 hover:opacity-80"
          >
            <IconsSearch className="w-8 h-8" />
          </button>
        </div>
        <div className="col-span-2 flex justify-end">
          <IconsUser className="h-10 w-10 opacity-70 hover:opacity-95 mr-6" />
        </div>
      </div>
      <div className="fixed  w-full  ">
        {searchSuggestionsList.map((item, index) => {
          return (
            <Link href={(`/search?query=${item}`)} key={index}>
            <div
              className="bg-transparent flex flex-col justify-center items-center"
              onClick={() => {
                setSearchSuggestionsList([]);
                redirect('/')
                // (`/search?query=${item}`);
              }}
              >
              <SearchSuggestions searchSuggest={item} />
            </div>
              </Link>
          );
        })}
      </div>
    </>
  );
};

export default Header;
