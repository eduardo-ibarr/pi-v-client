import { Bar } from "react-chartjs-2";
import { PageView } from "../../../../../models/trackings";

interface Props {
  pageViews: PageView[];
}

export default function PageViewsBarChart({ pageViews }: Props) {
  const aggregatedPageViewCountsByUrl: Record<string, number> = {};

  pageViews.forEach((view: PageView) => {
    aggregatedPageViewCountsByUrl[view.url] =
      (aggregatedPageViewCountsByUrl[view.url] || 0) + 1;
  });

  const barChartData = {
    labels: Object.keys(aggregatedPageViewCountsByUrl),
    datasets: [
      {
        label: "Visualizações da Página",
        data: Object.values(aggregatedPageViewCountsByUrl),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={barChartData} />;
}
