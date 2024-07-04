import { useMutation } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

const trackingsService = new TrackingsService();

export default function useSendPageViewTrack() {
  return useMutation({
    mutationFn: trackingsService.createPageView,
  });
}
