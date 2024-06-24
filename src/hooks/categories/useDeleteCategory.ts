import { useMutation } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useDeleteCategory() {
  return useMutation({
    mutationFn: CategoriesServices.delete,
  });
}
