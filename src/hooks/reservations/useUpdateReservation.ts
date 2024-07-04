import { useMutation } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

const reservationsServices = new ReservationsServices();

export default function useUpdateReservation() {
  return useMutation({
    mutationFn: reservationsServices.update,
  });
}
