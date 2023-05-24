'use client'
import React, { useState } from "react";
// import { convertNumber } from "../../utils/helperfunctions";
import VideoDescription from "./VideoDescription";
const AboutChannel = ({ videoid }) => {
  const [channelDetails, setChannelDetails] = useState({});
  const [videoDetials, setvideoDetials] = useState([]);
  const getVideoDetails = async () => {
    const videoData = await fetch(`youtube/video?id=${videoid}`)
    const videoJson = await videoData.json()
    setvideoDetials(videoJson);
    setChannelDetails(videoJson.channel);
    console.log(videoJson.channel)
  };
  React.useEffect(() => {
    getVideoDetails();
  }, []);
  return (
    <div className="mt-5">
      <h2 className="ml-3 md:ml-0 font-semibold text-xl">{videoDetials?.title}</h2>
      <div className="md:grid md:grid-cols-12 mt-4 ml-4 md:ml-0">
        <div className="md:col-span-6 flex items-center gap-8">
          <img
            alt="user-icon"
            src={channelDetails?.icon}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold"> {channelDetails?.name}</h3>
            <p className="text-sm">
              {/* {convertNumber(channelDetails?.subscribers)} subscribers */}
            </p>
          </div>
          <button className="bg-black text-white rounded-full px-2.5 py-1.5">
            Subscribe
          </button>
        </div>

      </div>
      <VideoDescription details={videoDetials} />
    </div>
  );
};

export default AboutChannel;
