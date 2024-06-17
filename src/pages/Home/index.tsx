import Carousel from "../../components/Carousel";
import useListProducts from "../../hooks/products/useListProducts";
import { Product } from "../../models/products";
import PromotionalBanner from "../../components/PromotionalBanner";
import NewArrivalsSection from "../../components/NewArrivalsSection";
import TrendingStylesSection from "../../components/TrendingStylesSection";
import { FaInstagram } from "react-icons/fa";
import useFeed from "../../hooks/instagram/useFeed";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";
import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import LoadingSpin from "../../components/LoadingSpin";

function HomePage() {
  const { data, isLoading } = useListProducts({
    limit: 10,
    page: 1,
    sort: "created_at:desc",
    search: "",
  });

  const { mutateAsync: sendTrack } = useSendPageViewTrack();

  const imagesFeed = useFeed();

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/",
      user_id: null,
    });
  }, [sendTrack]);

  if (isLoading) {
    return <LoadingSpin />;
  }

  const slicedProducts = (data?.items as Product[]).slice(0, 4);

  return (
    <>
      <PromotionalBanner message="Abriremos neste final de semana!" />
      <main className="container mx-auto w-full">
        <div className="mt-8 flex justify-center">
          <Carousel images={imagesFeed} />
        </div>
        <NewArrivalsSection products={slicedProducts} />
        <TrendingStylesSection products={slicedProducts} />
        <div className="mt-8 flex justify-center items-center">
          <a
            href="https://www.instagram.com/brechocomunitariosantiago/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2"
          >
            <FaInstagram size={60} color="#993399" />
          </a>
          <Typography className=" text-xl">SIGA-NOS NO INSTAGRAM</Typography>
        </div>
      </main>
    </>
  );
}

export default HomePage;
