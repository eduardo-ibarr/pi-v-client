import { useQuery } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

const usersServices = new UsersServices();

export default function useListUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersServices.list(),
    staleTime: 1000 * 60 * 5,
  });
}
