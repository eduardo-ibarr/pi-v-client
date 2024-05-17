import { useQuery } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

export default function useListProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductsServices.list,
  });
}
