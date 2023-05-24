import ShimmerRecomendedCard from "./ShimmerRecomendedCard";

const ShimmerVideoPlayer = () => {
  return (
    <div className="flex">
      <div className="mt-7 ml-8 w-[800px] h-[500px] mr-3 animate-pulse">
        <div className="w-full h-[450px] rounded-md bg-gray-200" />
        <div className="mt-2 flex">
          <div className="p-2">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
          <div className="p-2">
            <div className="w-60 h-6 bg-gray-200"></div>
            <div className="w-52 h-6 bg-gray-200 mt-2"></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {Array(4)
          .fill(10)
          .map((item, index) => (
            <ShimmerRecomendedCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default ShimmerVideoPlayer;
