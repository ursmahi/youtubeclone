"use client";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import ShimmerVideoCard from "./ShimmerVideoCard";
import RecomendedList from "./RecomendedList";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { menuSetDefault, toogleMenu } from "../../utils/redux/appSlice";
const Homepage = () => {
  const [homePageVideos, setHomePageVideos] = useState([]);
  const menuState = useSelector((store) => store.app.isOpen);
  const dispatch = useDispatch();
  const handleMenu = () => {
    dispatch(menuSetDefault());
  };
  useEffect(() => {
    handleMenu();
    fetchHomePageData();
  }, []);
  const fetchHomePageData = async () => {
    const homePage = await fetch(`youtube`);
    const homePageData = await homePage.json();
    setHomePageVideos(homePageData);
  };
  return (
    <>
      <RecomendedList />
      <div className="flex flex-wrap md:space-x-5 ">
        {homePageVideos.length > 0 ? (
          <>
            {homePageVideos.map((item, index) => {
              return (
                <Link href={`/watch?v=${item.id}`} key={item.id}>
                  <VideoCard homePageVideos={item} />
                </Link>
              );
            })}
          </>
        ) : (
          <>
            {Array(15)
              .fill(10)
              .map((item, index) => (
                <ShimmerVideoCard key={index} />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
