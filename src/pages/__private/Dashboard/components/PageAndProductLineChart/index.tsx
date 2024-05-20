import { Line } from "react-chartjs-2";
import { PageView, ProductView } from "../../../../../models/trackings";
import { formatDate } from "../../../../../utils/format";

interface Props {
  pageViews: PageView[];
  productViews: ProductView[];
}

export default function PageAndProductLineChart({
  pageViews,
  productViews,
}: Props) {
  const aggregatedPageViewCounts: Record<string, number> = {};
  const aggregatedProductViewCounts: Record<string, number> = {};

  pageViews.forEach((view: PageView) => {
    const dateKey = formatDate(new Date(view.timestamp));
    aggregatedPageViewCounts[dateKey] =
      (aggregatedPageViewCounts[dateKey] || 0) + 1;
  });

  productViews.forEach((view: ProductView) => {
    const dateKey = formatDate(new Date(view.timestamp));
    aggregatedProductViewCounts[dateKey] =
      (aggregatedProductViewCounts[dateKey] || 0) + 1;
  });

  const aggregatedDates = Object.keys(aggregatedPageViewCounts)
    .concat(Object.keys(aggregatedProductViewCounts))
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  const lineChartData = {
    labels: aggregatedDates,
    datasets: [
      {
        label: "Página",
        data: aggregatedDates.map(
          (date) => aggregatedPageViewCounts[date] || 0
        ),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Produto",
        data: aggregatedDates.map(
          (date) => aggregatedProductViewCounts[date] || 0
        ),
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  return (
    <Line
      data={lineChartData}
      // options={{
      //   maintainAspectRatio: false,
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      //   plugins: {
      //     legend: {
      //       display: true,
      //       position: "top",
      //     },
      //   },
      // }}
    />
  );
}
