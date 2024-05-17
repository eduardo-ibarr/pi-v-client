import Carousel from "../../components/Carousel";
import useListProducts from "../../hooks/products/useListProducts";
import { Product } from "../../models/products";
import PromotionalBanner from "../../components/PromotionalBanner";
import NewArrivalsSection from "../../components/NewArrivalsSection";
import FeaturedBrandsSection from "../../components/FeaturedBrandsSection";
import SocialProofSection from "../../components/SocialProofSection";
import TrendingStylesSection from "../../components/TrendingStylesSection";
import { Review } from "../../components/SocialProofSection";

function HomePage() {
  const { data, isLoading } = useListProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const slicedProducts = (data as Product[]).slice(0, 4);

  const reviews: Review[] = [
    {
      author: "Maria Silva",
      comment: "Adorei as roupas! Ótima qualidade e entrega rápida.",
    },
    {
      author: "João Santos",
      comment: "Recomendo! Preços justos e atendimento excelente.",
    },
    {
      author: "Maria do Carmo",
      comment: "Comprei um tênis e chegou em perfeito estado. Amei!",
    },
  ];

  return (
    <>
      <PromotionalBanner message="Frete grátis em compras acima de R$200!" />
      <main className="container mx-auto w-full">
        <Carousel images={[]} />
        <NewArrivalsSection products={slicedProducts} />
        <TrendingStylesSection products={slicedProducts} />
        <FeaturedBrandsSection brands={["Nike", "Adidas", "Levi's", "Gucci"]} />
        <SocialProofSection reviews={reviews} />
      </main>
    </>
  );
}

export default HomePage;
