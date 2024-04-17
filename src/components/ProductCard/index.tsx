import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ProductCard() {
  return (
    <Card className="w-80">
      <CardHeader shadow={false} floated={false}>
        <img
          src="https://cdn.awsli.com.br/600x700/1897/1897332/produto/207096638/camiseta-preta-vitseu.jpg"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Camiseta Básica
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            R$ 95,00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse tenetur
          impedit atque voluptate fugit tempore?
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Ver mais
        </Button>
      </CardFooter>
    </Card>
  );
}
