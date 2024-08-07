import { useQuery } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

const reservationsServices = new ReservationsServices();

export default function useShowReservation(id: string) {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => reservationsServices.show(id),
  });
}
