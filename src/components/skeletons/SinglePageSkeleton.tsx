import React from "react";

/**
 * Skeleton placeholder component for a single product page.
 * Displays loading placeholders for image, title, rating, price, description, tags, quantity, and buttons.
 *
 * @returns {JSX.Element} The single product page skeleton placeholder
 */
const SinglePageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 min-h-svh max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image skeleton */}
        <div className="w-full aspect-square bg-gray-200 animate-pulse"></div>

        <div>
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>

          {/* Rating skeleton */}
          <div className="my-4 flex">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-5 h-5 bg-gray-200 rounded-full mr-1 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Price skeleton */}
          <div className="my-3 flex items-center">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="ml-2 h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="ml-2 h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>

          {/* Description skeleton */}
          <div className="my-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* Tags skeleton */}
          <div className="my-3">
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
            <div className="flex flex-wrap gap-1">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-200 rounded w-16 animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity and button skeleton */}
          <div className="my-4">
            <div className="flex items-center mb-2">
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse mr-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex align-baseline gap-4">
          <div className="h-7 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-7 bg-gray-200 rounded w-10 animate-pulse"></div>
          <div className="h-7 bg-gray-200 rounded-full w-7 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border p-4">
              <div className="flex justify-between mb-2">
                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className="w-4 h-4 bg-gray-200 rounded-full mr-1 animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePageSkeleton;
