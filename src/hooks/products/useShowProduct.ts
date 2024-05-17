import { useQuery } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

export default function useShowProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => ProductsServices.show(id),
  });
}
