import { Typography } from "@material-tailwind/react";
import Carousel from "../../components/Carousel";
import { ProductCard } from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function HomePage() {
  const images = [
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  ];

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
