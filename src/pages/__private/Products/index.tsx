import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Importe o componente Link para navegação
import useListProducts from "../../../hooks/products/useListProducts";
import { Product } from "../../../models/products";
import { AdminProductCard } from "./components/AdminProductCard";

export default function AdminProductsPage() {
  const { data, isLoading, isError, error } = useListProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-8 py-6">
      <Typography className="text-3xl font-semibold mb-6">
        Administração de Produtos
      </Typography>

      <Link to="/admin/products/create">
        <Button color="blue" className="mb-4">
          Criar Novo Produto
        </Button>
      </Link>

      <div className="w-full grid grid-cols-4">
        {data?.map((product: Product) => (
          <AdminProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
