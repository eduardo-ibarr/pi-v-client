import React from "react";
import { Product } from "../../models/products";
import { ProductCard } from "../ProductCard";
import { Typography } from "@material-tailwind/react";

interface NewArrivalsSectionProps {
  products: Product[];
}

const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
}) => {
  return (
    <section className="my-8">
      <Typography variant="h4" className="text-center mb-4">
        Novidades
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
