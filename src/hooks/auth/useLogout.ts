import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "../../services/auth";

const authServices = new AuthServices();

export default function useLogout() {
  return useMutation({
    mutationFn: authServices.logout,
  });
}
