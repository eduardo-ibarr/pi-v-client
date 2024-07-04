import { useMutation } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

const categoriesServices = new CategoriesServices();

export default function useDeleteCategory() {
  return useMutation({
    mutationFn: categoriesServices.delete,
  });
}
