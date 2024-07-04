import { useMutation } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

const trackingsService = new TrackingsService();

export default function useSendProductViewTrack() {
  return useMutation({
    mutationFn: trackingsService.createProductView,
  });
}
