import { useMutation } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useUpdateCategory() {
  return useMutation({
    mutationFn: CategoriesServices.update,
  });
}
