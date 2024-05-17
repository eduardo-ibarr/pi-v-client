import React from "react";

interface PromotionalBannerProps {
  message: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white py-2 px-4 text-center">{message}</div>
  );
};

export default PromotionalBanner;
