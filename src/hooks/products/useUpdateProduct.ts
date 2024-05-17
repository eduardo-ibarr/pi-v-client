import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

export default function useUpdateProduct() {
  return useMutation({
    mutationFn: ProductsServices.update,
  });
}
