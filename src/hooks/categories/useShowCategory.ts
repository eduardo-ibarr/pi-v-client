import { useQuery } from "@tanstack/react-query";
import { CategoriesServices } from "../../services/categories";

export default function useShowCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoriesServices.show(id),
  });
}
