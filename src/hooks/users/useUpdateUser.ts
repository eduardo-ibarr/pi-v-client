import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";

export default function useUpdateUser() {
  return useMutation({
    mutationFn: UsersServices.updateProfile,
  });
}
