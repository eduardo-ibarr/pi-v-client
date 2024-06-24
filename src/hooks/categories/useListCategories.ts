import { useQuery } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useListCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesServices.list,
  });
}
