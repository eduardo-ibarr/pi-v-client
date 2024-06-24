import { useParams, Link } from "react-router-dom";
import { Typography, Button, Breadcrumbs } from "@material-tailwind/react";
import useShowProduct from "../../hooks/products/useShowProduct";
import { formatPrice } from "../../utils/format";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import useSendProductViewTrack from "../../hooks/trackings/useSendProductViewTrack";
import useCreateReservation from "../../hooks/reservations/useCreateReservation";
import useTokenData from "../../hooks/app/useTokenData";

function ProductDetails() {
  const { productId } = useParams();
  const data = useTokenData();
  const { data: product, isLoading } = useShowProduct(productId || "");
  const { mutateAsync: sendTrack } = useSendProductViewTrack();
  const [notLoggedWarning, setNotLoggedWarning] = useState(false);

  const { mutateAsync: create } = useCreateReservation();

  useEffect(() => {
    sendTrack({
      event_type: "product_view",
      product_id: Number(productId),
      user_id: null,
    });
  }, [productId, sendTrack]);

  const handleReserve = async () => {
    if (!data) {
      setNotLoggedWarning(true);
      return;
    }

    try {
      await create({
        user_id: data.id,
        total_amount: product?.price,
        reservation_items: [
          {
            product_id: product?.id,
            price: product?.price,
          },
        ],
      });

      alert("Produto reservado com sucesso!");

      const text = `Olá, sou ${data.email} e gostaria de reservar o produto ${product?.name}. Como podemos prosseguir?`;

      const linkElement = document.createElement("a");

      linkElement.href = `https://wa.me/${55999999999}?text=${text}`;
      linkElement.target = "_blank";
      linkElement.click();
      linkElement.remove();
    } catch (error) {
      alert("Erro ao reservar produto");

      console.error(error);
    }
  };

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
          width="400px"
          height="300px"
          className="rounded-lg shadow-md object-cover"
        />
        <div className="md:w-1/2">
          <Typography variant="h4" className="font-bold">
            {product.name}
          </Typography>

          <Typography variant="h5" className="text-red-500 font-bold mb-4">
            {formatPrice(product.price)}
          </Typography>
          <Typography className="mb-4">{product.description}</Typography>

          <Button
            className="text-white font-bold py-3 px-4 rounded flex items-center"
            onClick={handleReserve}
            disabled={product.status === "unavailable"}
          >
            <BsFillCartPlusFill className="mr-2" /> Reservar este item
          </Button>

          {product.status === "unavailable" && (
            <Typography color="red" className="mt-4">
              Produto reservado por outro cliente. Caso não seja confirmado, ele
              estará disponível novamente.
            </Typography>
          )}

          {notLoggedWarning && (
            <div>
              <Typography color="red" className="mt-4">
                Para reservar um produto, é necessário estar logado.{" "}
                <Link
                  className="text-black"
                  to="/login"
                  onClick={() => setNotLoggedWarning(false)}
                >
                  Fazer login
                </Link>
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
