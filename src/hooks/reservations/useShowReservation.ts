import { useQuery } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";

export default function useShowReservation(id: string) {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => ReservationsServices.show(id),
  });
}
