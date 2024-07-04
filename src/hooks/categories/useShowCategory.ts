import { useQuery } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

const categoriesServices = new CategoriesServices();

export default function useShowCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesServices.show(id),
  });
}
