import { useQuery } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

export default function useListPageViews() {
  return useQuery({
    queryKey: ["page-views"],
    queryFn: () => TrackingsService.listPageViews(),
  });
}
