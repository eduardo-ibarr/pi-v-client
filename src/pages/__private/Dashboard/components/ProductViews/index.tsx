import { ProductView } from "../../../../../models/trackings";

interface Props {
  productViews: ProductView[];
}

export default function ProductViews({ productViews }: Props) {
  const aggregatedProductViewCounts: Record<string, number> = {};

  productViews.forEach((view: ProductView) => {
    const dateKey = view.product_name.toString();
    aggregatedProductViewCounts[dateKey] =
      (aggregatedProductViewCounts[dateKey] || 0) + 1;
  });

  console.log(aggregatedProductViewCounts);

  return (
    <div>
      {Object.keys(aggregatedProductViewCounts).map((key) => (
        <div key={key}>
          {key}: <b>{aggregatedProductViewCounts[key]}</b> visualizações
        </div>
      ))}
    </div>
  );
}
