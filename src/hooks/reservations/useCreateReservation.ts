import { useMutation } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useCreateCategory() {
  return useMutation({
    mutationFn: CategoriesServices.create,
  });
}
