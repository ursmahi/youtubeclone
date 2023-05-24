import React, { useEffect, useState } from "react";
import { convertNumber } from "../../utils/helperfunctions";
import { useDispatch } from "react-redux";
import { menuSetDefault } from "../../utils/redux/appSlice";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Shimmersearchpage from "./Shimmersearchpage";
const SearchItemCard = ({ searchPageVideos }) => {
  const {
    title,
    uploadedAt,
    thumbnail,
    views,
    channel,
    durationFormatted,
    description,
  } = searchPageVideos;
  return (
    <div className=" mb-9 grid grid-cols-12 w-11/12  hover:cursor-pointer">
      <div className="relative col-span-4">
        <img className="object-cover rounded-md " src={thumbnail?.url} alt="" />
        <div className="absolute  p-1 bottom-0 inset-x-0 flex justify-end">
          <p className=" bg-black text-white text-end w-fit rounded-md px-0.5">
            {durationFormatted}
          </p>
        </div>
      </div>
      {/* <div className=""></div> */}
      <div className="m-2 flex col-span-8">
        <div className="">
          <div className="h-fit overflow-hidden font-semibold">{title}</div>
          <div className="flex opacity-80 mt-5">
            <p className="text-sm mr-3">{convertNumber(views)} views</p>
            <p className="text-sm">{uploadedAt}</p>
          </div>
          <div className="flex items-center mt-5">
            <img
              alt="user-icon"
              src={channel?.icon}
              className="w-10 h-10 rounded-full"
            />
            <p className="opacity-80 text-md ml-4">{channel?.name}</p>
          </div>
          {/* <div className="leading-6 h-24   overflow-hidden font-semibold">
            {description}
          </div> */}
        </div>
      </div>
    </div>
  );
};
const Searchpage = () => {
  const [searchVideosList, setSearchVideosList] = useState([]);
  const [searchCount, setSearchCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const parms = useSearchParams();
  const dispatch = useDispatch();
  const getSearchResuslts = async () => {
    const searchPage = await fetch(
      `youtube/search?query=${parms.get("query")}`
    );
    const searchPageData = await searchPage.json();
    setSearchCount(searchPageData?.length);
    setSearchVideosList(searchPageData);
    setLoading(false)
  };

  const setMenuDefault = () => {
    dispatch(menuSetDefault());
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setMenuDefault();
    getSearchResuslts();
    scrollToTop();
  }, [parms.get("query")]);
  if (loading) {
    return (
      <>
        {Array(5)
          .fill(10)
          .map((item, index) => (
            <Shimmersearchpage key={index} />
          ))}
      </>
    );
  }
  return (
    <div className="">
      {searchVideosList.length > 0 && searchCount > 0 ? (
        searchVideosList.map((item) => {
          return (
            <Link href={`/watch?v=${item.id}`} key={item.id}>
              <SearchItemCard searchPageVideos={item} />
            </Link>
          );
        })
      ) : (
        <>{searchCount === 0 ? <p>No results found</p> : <></>}</>
      )}
    </div>
  );
};

export default Searchpage;
