import { useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../../utils/auth";
import { AuthServices } from "../../services/auth";

const authServices = new AuthServices();

export function useLogin() {
  return useMutation({
    mutationFn: authServices.login,
    onSuccess: (token: string) => {
      setAccessToken(token);
    },
  });
}
