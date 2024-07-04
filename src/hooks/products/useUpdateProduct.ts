import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

const productsServices = new ProductsServices();

export default function useUpdateProduct() {
  return useMutation({
    mutationFn: productsServices.update,
  });
}
