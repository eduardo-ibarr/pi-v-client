import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

export default function useCreateProduct() {
  return useMutation({
    mutationFn: ProductsServices.create,
  });
}
