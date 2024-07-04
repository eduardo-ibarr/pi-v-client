import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

const usersServices = new UsersServices();

export function useRegisterUser() {
  return useMutation({
    mutationFn: usersServices.register,
  });
}
