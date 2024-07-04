import { useQuery } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

const categoriesServices = new CategoriesServices();

export default function useListCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesServices.list,
  });
}
