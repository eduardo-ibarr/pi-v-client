import React from "react";
import { Typography } from "@material-tailwind/react";

export interface Review {
  author: string;
  comment: string;
}

interface SocialProofSectionProps {
  reviews: Review[];
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ reviews }) => {
  return (
    <section className="my-8">
      <Typography variant="h4" className="text-center mb-4">
        O que nossos clientes dizem
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <Typography variant="h6" className="font-semibold mb-2">
              {review.author}
            </Typography>
            <Typography>{review.comment}</Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProofSection;
