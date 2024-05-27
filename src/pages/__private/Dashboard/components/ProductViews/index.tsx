import { ProductView } from "../../../../../models/trackings";
import { Card, Typography } from "@material-tailwind/react";

interface Props {
  productViews: ProductView[];
}

const TABLE_HEAD = ["Produto", "Visualizações"];

export default function ProductViews({ productViews }: Props) {
  const aggregatedProductViewCounts: Record<string, number> = {};

  productViews.forEach((view: ProductView) => {
    const productName = view.product_name.toString();
    aggregatedProductViewCounts[productName] =
      (aggregatedProductViewCounts[productName] || 0) + 1;
  });

  return (
    <Card className="h-full w-full overflow-hidden">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(aggregatedProductViewCounts).map((key, index) => {
            const isLast =
              index === Object.keys(aggregatedProductViewCounts).length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={key}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {key}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {aggregatedProductViewCounts[key]}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
