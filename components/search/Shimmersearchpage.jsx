import React from "react";

const Shimmersearchpage = () => {
  return (
    <div className="animate-pulse flex gap-3 w-8/12  h-36 mb-5">
      <div className="bg-gray-200 w-96 relative"></div>
      <div className="w-[650px]">
        <div className="bg-gray-200 h-8 mb-2"></div>
        <div className="bg-gray-200 h-8 mb-2"></div>
        <div className="bg-gray-200 h-6 w-1/4 mb-2"></div>
        <div className="bg-gray-200 h-6 w-2/4 mb-2"></div>
      </div>
    </div>
  );
};

export default Shimmersearchpage;
