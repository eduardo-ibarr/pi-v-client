import { useQuery } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

export default function useListProductViews() {
  return useQuery({
    queryKey: ["product-views"],
    queryFn: () => TrackingsService.listProductViews(),
  });
}
