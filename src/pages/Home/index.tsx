import { Typography } from "@material-tailwind/react";
import Carousel from "../../components/Carousel";
import { ProductCard } from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from 'axios';
import {useEffect, useState} from 'react';

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  permalink: string;
}

function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);

  async function getInstaFeed() {
    const token = import.meta.env.VITE_INSTA_TOKEN;
    const fields = "media_url,media_type,permalink";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    try {
      const { data } = await axios.get(url);
      setFeedList(data.data);
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
    }
  }

  useEffect(() => {
    getInstaFeed();
  }, []);

  // Extrair apenas os URLs de mídia
  const mediaUrls = feedList.map(item => item.media_url);

  return mediaUrls;
}

function HomePage() {
  const images = InstaFeed();
  
  return (
    <div>
      <Header />
      <div className="mt-8 flex justify-center">
        <Carousel images={images} />
      </div>

      <div className="flex justify-center gap-48 mx-14 my-8">
        <div>
          <img
            className="w-32 h-32 rounded-full mx-auto mt-4"
            src="https://blog.meninashoes.com.br/wp-content/uploads/2023/11/varios-tipos-de-calcados-tenis-sandalia-sapatilha-em-fundo-azul.jpg"
            alt="aa"
          />
          <Typography className="text-2xl mt-4 text-center">
            Calçados
          </Typography>
        </div>

        <div>
          <img
            className="w-32 h-32 rounded-full mx-auto mt-4"
            src="https://menside.com.br/cdn/shop/files/Camiseta-de-manga-comprida-Oxford-masculina-lazer-juvenil-slim-fit-moda-coreana-camisas-elegantes-de-luxo.jpg_3bf782cf-065c-4637-a555-ecd47cc0984f_1200x1200.webp?v=1693691913"
            alt="aa"
          />
          <Typography className="text-2xl mt-4 text-center">
            Camisetas
          </Typography>
        </div>

        <div>
          <img
            className="w-32 h-32 rounded-full mx-auto mt-4"
            src="https://img.lojasrenner.com.br/item/551755039/large/3.jpg"
            alt="aa"
          />
          <Typography className="text-2xl mt-4 text-center">Blusas</Typography>
        </div>
      </div>

      <div className="mx-8 py-5 flex justify-center gap-20">
        {[1, 2, 3].map((product) => (
          <ProductCard key={product} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
