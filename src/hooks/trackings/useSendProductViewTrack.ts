import { useMutation } from "@tanstack/react-query";
import { TrackingsService } from "../../services/trackings";

export default function useSendProductViewTrack() {
  return useMutation({
    mutationFn: TrackingsService.createProductView,
  });
}
