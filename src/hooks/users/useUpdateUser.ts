import { useMutation } from "@tanstack/react-query";
import { UsersServices } from "../../services/users";
import { UpdateProfileData } from "../../models/users";

const usersServices = new UsersServices();

export default function useUpdateUser(id: number) {
  return useMutation({
    mutationFn: (data: UpdateProfileData) => usersServices.update(id, data),
  });
}
