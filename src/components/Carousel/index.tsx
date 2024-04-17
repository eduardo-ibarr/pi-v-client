import { Carousel } from "@material-tailwind/react";

interface Props {
  images: string[];
}

function CustomCarousel({ images }: Props) {
  return (
    <Carousel className="rounded-xl w-[90%] h-[400px]">
      {images.map((image, index) => (
        <img
          src={image}
          alt={`Imagem ${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
