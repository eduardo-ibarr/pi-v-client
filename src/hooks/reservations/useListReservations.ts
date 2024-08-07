import { useQuery } from "@tanstack/react-query";
import { ReservationsServices } from "../../services/reservations";
import { QueryListReservations } from "../../models/reservations";

const reservationsServices = new ReservationsServices();

export default function useListReservations(data: QueryListReservations) {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: () => reservationsServices.list(data),
  });
}
