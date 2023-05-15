import React from 'react';

interface SkeletonLoaderProps {
  height: string;
  width: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ height, width }) => {
  return (
    <div className="animate-pulse relative">
      <div className={`transition-all duration-100 bg-gray-100 opacity-60 h-${height} w-${width} rounded-md mb-2`}></div>
      <div className={`transition-all absolute top-0 duration-100 bg-gray-100 opacity-60 h-${height} w-${width} rounded-md mb-2`}></div>
    </div>
  );
};
