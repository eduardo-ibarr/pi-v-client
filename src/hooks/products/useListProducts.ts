import { useQuery } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";
import { QueryListProducts } from "../../models/products";

const productsServices = new ProductsServices();

export default function useListProducts(data: QueryListProducts) {
  return useQuery({
    queryKey: ["products", data],
    queryFn: () => productsServices.list(data),
    staleTime: 1000 * 60 * 5,
  });
}
