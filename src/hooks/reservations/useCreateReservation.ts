import { useMutation } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

const reservationsServices = new ReservationsServices();

export default function useCreateReservation() {
  return useMutation({
    mutationFn: reservationsServices.create,
  });
}
