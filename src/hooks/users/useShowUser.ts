import { useQuery } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

const usersServices = new UsersServices();

export default function useShowProduct(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => usersServices.getById(id),
  });
}
