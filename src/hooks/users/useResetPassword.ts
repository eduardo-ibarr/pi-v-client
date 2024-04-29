import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export function useResetPassword() {
  return useMutation({
    mutationFn: UsersServices.resetPassword,
  });
}
