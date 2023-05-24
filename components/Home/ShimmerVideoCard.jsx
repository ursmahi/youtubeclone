'use client'
const ShimmerVideoCard = () => {
    return (
    <div className="w-full md:w-80 mb-3 md:mb-9 animate-pulse">
      <div
        className="w-full h-56 md:w-80 md:h-44 rounded-md bg-gray-200"

      />
      <div className="mt-2 flex">
        <div className="p-2">
          <div
            className="w-10 h-10 rounded-full bg-gray-200"
          />
        </div>
        <div className="p-2">
        <div className="w-60 h-6 bg-gray-200"></div>
        <div className="w-52 h-6 bg-gray-200 mt-2"></div>
        </div>
      </div>
    </div>
    )
}

export default ShimmerVideoCard