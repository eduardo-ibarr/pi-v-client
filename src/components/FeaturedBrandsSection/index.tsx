import React from "react";
import { Typography } from "@material-tailwind/react";

interface FeaturedBrandsSectionProps {
  brands: string[];
}

const FeaturedBrandsSection: React.FC<FeaturedBrandsSectionProps> = ({
  brands,
}) => {
  return (
    <section className="my-8">
      <Typography variant="h4" className="text-center mb-4">
        Marcas em Destaque
      </Typography>
      <div className="flex flex-wrap justify-center gap-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="bg-gray-100 rounded-lg p-4 flex items-center"
          >
            <Typography variant="h6">{brand}</Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrandsSection;
