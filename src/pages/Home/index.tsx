import Carousel from "../../components/Carousel";
import useListProducts from "../../hooks/products/useListProducts";
import { Product } from "../../models/products";
import PromotionalBanner from "../../components/PromotionalBanner";
import NewArrivalsSection from "../../components/NewArrivalsSection";
import FeaturedBrandsSection from "../../components/FeaturedBrandsSection";
import SocialProofSection from "../../components/SocialProofSection";
import TrendingStylesSection from "../../components/TrendingStylesSection";
import { Review } from "../../components/SocialProofSection";
import { FaInstagram } from "react-icons/fa";
import useFeed from "../../hooks/instagram/useFeed";

function HomePage() {
  const { data, isLoading } = useListProducts();

  const imagesFeed = useFeed();

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
        <div className="mt-8 flex justify-center items-center">
          <a
            href="https://www.instagram.com/brechocomunitariosantiago/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2"
          >
            <FaInstagram size={60} color="#993399" />
          </a>
          <div>
            <p className="mb-2 text-2xl">SIGA-NOS NO INSTAGRAM!</p>
            <p className="mb-2 text-2xl">VEJA ALGUMAS DE NOSSAS POSTAGENS:</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Carousel images={imagesFeed} />
        </div>
      </main>
    </>
  );
}

export default HomePage;
