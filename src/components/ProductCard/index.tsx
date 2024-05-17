import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Product } from "../../models/products";
import { formatPrice } from "../../utils/format";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="w-80">
      <CardHeader shadow={false} floated={false}>
        <img
          src={product.image_url}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col h-52">
        <Typography color="blue-gray" className="font-medium">
          {product.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium my-2">
          <b>{formatPrice(product.price)}</b>
        </Typography>
        <div className="overflow-y-auto flex-grow">
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </div>
      </CardBody>

      <CardFooter className="pt-0">
        <Link to={`/products/${product.id}`}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Ver mais
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
