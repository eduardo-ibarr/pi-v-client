export default function useSendTrack(type: "page" | "product") {
  const mutationFn =
    type === "page"
      ? TrackingsService.createPageView
      : TrackingsService.createProductView;

  return useMutation({
    mutationFn,
  });
}
