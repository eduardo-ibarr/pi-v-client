import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export function useForgotPassword() {
  return useMutation({
    mutationFn: UsersServices.forgotPassword,
  });
}
