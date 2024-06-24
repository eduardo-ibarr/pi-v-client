import { useMutation } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

export default function useDeleteReservation() {
  return useMutation({
    mutationFn: ReservationsServices.delete,
  });
}
