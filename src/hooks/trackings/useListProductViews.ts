import { useQuery } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

const trackingsService = new TrackingsService();

export default function useListProductViews() {
  return useQuery({
    queryKey: ["product-views"],
    queryFn: () => trackingsService.listProductViews(),
  });
}
