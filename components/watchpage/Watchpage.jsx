import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toogleWatchMenu } from "../../utils/redux/appSlice";
import AboutChannel from "./AboutChannel";
import RecomendedVideoCard from "./RecomendedVideoCard";
const Watchpage = () => {
  const parms = useSearchParams();
  const dipatch = useDispatch();
  const [recomendedVideos, setRecomendedVideos] = useState([]);

  const handleMenu = (sendReq) => {
    dipatch(toogleWatchMenu(sendReq));
  };

  const fetchRecomendedVideos = async () => {
    const homePage = await fetch(`youtube`);
    const homePageData = await homePage.json();
    setRecomendedVideos(homePageData);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  React.useEffect(() => {
    handleMenu("watchOff");

    scrollToTop();
    fetchRecomendedVideos();
  }, [parms.get("v")]);
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
