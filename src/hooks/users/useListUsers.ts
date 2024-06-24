import { useQuery } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export default function useListUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UsersServices.list(),
    staleTime: 1000 * 60 * 5,
  });
}
