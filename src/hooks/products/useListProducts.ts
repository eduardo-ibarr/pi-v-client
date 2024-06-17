import { useQuery } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";
import { QueryListProducts } from "../../models/products";

export default function useListProducts(data: QueryListProducts) {
  return useQuery({
    queryKey: ["products", data],
    queryFn: () => ProductsServices.list(data),
    staleTime: 1000 * 60 * 5,
  });
}
