import { useMutation } from "@tanstack/react-query";
import { ProductsServices } from "../../services/products";

export default function useDeleteUser() {
  return useMutation({
    mutationFn: ProductsServices.delete,
  });
}
