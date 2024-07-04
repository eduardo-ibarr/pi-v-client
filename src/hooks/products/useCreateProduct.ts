import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

const productsServices = new ProductsServices();

export default function useCreateProduct() {
  return useMutation({
    mutationFn: productsServices.create,
  });
}
