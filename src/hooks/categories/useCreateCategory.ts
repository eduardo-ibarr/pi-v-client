import { useMutation } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useCreateCategories() {
  return useMutation({
    mutationFn: CategoriesServices.create,
  });
}
