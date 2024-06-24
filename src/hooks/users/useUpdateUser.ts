import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";
import { UpdateProfileData } from "../../models/users";

export default function useUpdateUser(id: number) {
  return useMutation({
    mutationFn: (data: UpdateProfileData) => UsersServices.update(id, data),
  });
}
