import { useQuery } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export default function useShowProduct(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => UsersServices.getById(id),
  });
}
