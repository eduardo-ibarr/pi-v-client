import { useMutation } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

export default function useCreateReservation() {
  return useMutation({
    mutationFn: ReservationsServices.create,
  });
}
