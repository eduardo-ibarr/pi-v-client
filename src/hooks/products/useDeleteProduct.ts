import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

const productsServices = new ProductsServices();

export default function useDeleteProduct() {
  return useMutation({
    mutationFn: productsServices.delete,
  });
}
