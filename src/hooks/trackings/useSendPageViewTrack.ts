import { useMutation } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

export default function useSendPageViewTrack() {
  return useMutation({
    mutationFn: TrackingsService.createPageView,
  });
}
