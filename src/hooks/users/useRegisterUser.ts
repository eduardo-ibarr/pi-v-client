import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export function useRegisterUser() {
  return useMutation({
    mutationFn: UsersServices.register,
  });
}
