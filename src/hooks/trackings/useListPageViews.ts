import { useQuery } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

const trackingsService = new TrackingsService();

export default function useListPageViews() {
  return useQuery({
    queryKey: ["page-views"],
    queryFn: () => trackingsService.listPageViews(),
  });
}
