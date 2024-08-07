import React from "react";
import { Product } from "../../models/products";
import { ProductCard } from "../ProductCard";
import { Typography } from "@material-tailwind/react";

interface EmphasisSectionProps {
  products: Product[];
}

const EmphasisSection: React.FC<EmphasisSectionProps> = ({ products }) => {
  return (
    <section className="my-8">
      <Typography variant="h4" className="text-center mb-4">
        Produtos em Destaque
      </Typography>
      <div className="flex justify-center gap-12">
        {[products[0], products[1]].map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default EmphasisSection;
