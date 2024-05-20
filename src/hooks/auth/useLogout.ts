import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "../../services/auth";

export default function useLogout() {
  return useMutation({
    mutationFn: AuthServices.logout,
  });
}
