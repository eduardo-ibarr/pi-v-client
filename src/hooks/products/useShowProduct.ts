import { useQuery } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

const productsServices = new ProductsServices();

export default function useShowProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsServices.show(id),
  });
}
