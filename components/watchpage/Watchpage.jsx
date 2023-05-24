import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toogleWatchMenu } from "../../utils/redux/appSlice";
import AboutChannel from "./AboutChannel";
import RecomendedVideoCard from "./RecomendedVideoCard";
import Image from "next/image";
import Link from "next/link";
import ShimmerVideoPlayer from "./shimmer/ShimmerVideoPlayer";
const Watchpage = () => {
  const parms = useSearchParams();
  const dipatch = useDispatch();
  const [recomendedVideos, setRecomendedVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState("beforeloading");

  const handleMenu = (sendReq) => {
    dipatch(toogleWatchMenu(sendReq));
  };

  const fetchRecomendedVideos = async () => {
    const homePage = await fetch(`youtube`);
    const homePageData = await homePage.json();
    setRecomendedVideos(homePageData);
  };
  const getVideoDetails = async () => {
    const videoData = await fetch(`youtube/video?id=${parms.get("v")}`);
    const videoJson = await videoData.json();
    setVideoDetails(videoJson);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  React.useEffect(() => {
    handleMenu("watchOff");
    getVideoDetails();
    scrollToTop();
    fetchRecomendedVideos();
  }, [parms.get("v")]);
  if (videoDetails == "beforeloading") 
  {
    return (
        <ShimmerVideoPlayer />
    );
  }
  if (videoDetails == null) {
    return (
      <center className="">
        <Image
          src="/assets/unavailable_video.png"
          className="w-max h-72"
          width={1000}
          height={1000}
          alt="Youtube"
          priority={true}
        />
        <p className="text-center mb-5">This video isn't available anymore</p>
        <Link href="/">
          <button className="border rounded-full w-fit p-1 pl-2 pr-2 text-blue-500 hover:bg-blue-200 ">
            GO TO HOME
          </button>
        </Link>
      </center>
    );
  }
  return (
    <div className="mt-7 ml-8 grid grid-cols-12  gap-4">
      <div className="col-span-8">
        <iframe
          className=" w-full"
          height="470"
          src={`https://www.youtube.com/embed/${parms.get("v")}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <AboutChannel videoid={parms.get("v")} />
        {/* <Comments videoid={parms.get("v")} />  */}
      </div>
      <div className="col-span-3">
        {recomendedVideos.map((item, index) => {
          return <RecomendedVideoCard key={index} recomendedVideos={item} />;
        })}
      </div>
    </div>
  );
};

export default Watchpage;
