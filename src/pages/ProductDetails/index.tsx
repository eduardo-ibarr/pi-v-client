import { useParams, Link } from "react-router-dom";
import { Typography, Button, Breadcrumbs } from "@material-tailwind/react";
import useShowProduct from "../../hooks/products/useShowProduct";
import { formatPrice } from "../../utils/format";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import useSendProductViewTrack from "../../hooks/trackings/useSendProductViewTrack";

function ProductDetails() {
  const { productId } = useParams();
  const { data: product, isLoading } = useShowProduct(productId || "");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { mutateAsync: sendTrack } = useSendProductViewTrack();

  useEffect(() => {
    sendTrack({
      event_type: "product_view",
      product_id: Number(productId),
      user_id: null,
    });
  }, [productId, sendTrack]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <Breadcrumbs className="mb-4">
        <Link to="/">Home</Link>
        <Typography color="gray">{product.name}</Typography>
      </Breadcrumbs>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="md:w-1/2">
          <Typography variant="h4" className="font-bold">
            {product.name}
          </Typography>

          <Typography variant="h5" className="text-red-500 font-bold mb-4">
            {formatPrice(product.price)}
          </Typography>
          <Typography className="mb-4">{product.description}</Typography>

          <div className="mb-6">
            <Typography variant="h6">Tamanho:</Typography>
            <select
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="">Selecione um tamanho</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
            </select>
          </div>

          <Button
            className="text-white font-bold py-3 px-4 rounded flex items-center"
            disabled={!selectedSize}
          >
            <BsFillCartPlusFill className="mr-2" /> Reservar este item
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
