import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

const usersServices = new UsersServices();

export function useResetPassword() {
  return useMutation({
    mutationFn: usersServices.resetPassword,
  });
}
