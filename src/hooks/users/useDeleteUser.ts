import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

const usersServices = new UsersServices();

export default function useDeleteUser() {
  return useMutation({
    mutationFn: usersServices.delete,
  });
}
