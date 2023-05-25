import React from "react";
import { convertNumber } from "../../utils/helperfunctions";
const SmallTrendingPage = ({homePageVideos}) => {
    const {title,uploadedAt,thumbnail,views,channel,duration_formatted} = homePageVideos
     console.log(homePageVideos?.durationFormatted)
    return (
    <div className="w-full md:w-80 mb-3 md:mb-9">
      <div className="relative ">
      <img
        className="object-cover w-full md:rounded-md"
        src={thumbnail?.url}
        alt=""
        />
      <div className="absolute  p-1 bottom-0 inset-x-0 flex justify-end">
        <p className=" bg-black text-white text-end w-fit rounded-md px-0.5">
          {duration_formatted}
          </p>
        </div>
        </div>
      <div className="lg:mt-2 flex">
        <div className="p-2">
            <div className="w-12 h-12 rounded-full bg-center object-fit" style={{backgroundImage: `url(${channel?.icon})` }}>
            </div>
          {/* <img
            className="w-10 h-10 rounded-full"
            src={channel?.icon}
            alt="icon"
          /> */}
        </div>
        <div className="">
            <div className="leading-6 h-12 overflow-hidden font-semibold">
            {/* {title.length >60 ? title.slice(0,55)+" ...": title} */}
            {title}
            </div>
          <p className="opacity-80">{channel?.name}</p>
          <div className="flex items-center opacity-80">
            <p className="mr-3">{convertNumber(views)} Views</p>
            <p className="">
           {uploadedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallTrendingPage;
