import { useMutation } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

export default function useUpdateReservation() {
  return useMutation({
    mutationFn: ReservationsServices.update,
  });
}
