import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  IconButton,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useListCategories from "../../../../hooks/categories/useListCategories";
import LoadingSpin from "../../../../components/LoadingSpin";
import { CreateProductData } from "../../../../models/products";
import useCreateProduct from "../../../../hooks/products/useCreateProduct";
import { useEffect } from "react";

export default function CreateProductPage() {
  const { data: categories, isLoading } = useListCategories();
  const { mutateAsync: create, isSuccess } = useCreateProduct();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateProductData>({});

  const onSubmit = async (data: CreateProductData) => {
    await create(data);
    reset();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Produto cadastrado com sucesso!");
      navigate("/admin/products");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (!categories) {
    return <div>No categories found</div>;
  }

  return (
    <Card className="m-4">
      <CardBody>
        <div className="flex items-center mb-4">
          <IconButton onClick={handleCancel} variant="text" color="gray">
            <ArrowLeftIcon className="h-5 w-5" />
          </IconButton>
          <Typography variant="h5" className="ml-2 text-black">
            Cadastro de Produto
          </Typography>
        </div>

        <Typography color="gray">
          Preencha os campos abaixo para cadastrar um novo produto.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Input
              crossOrigin=""
              type="text"
              label="Nome do Produto"
              error={!!errors.name?.message}
              {...register("name", {
                required: "O nome do produto é obrigatório",
              })}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <Select
                  label="Categoria"
                  error={!!errors.category_id?.message}
                  {...field}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="mb-4">
            <Input
              crossOrigin=""
              type="number"
              label="Preço"
              error={!!errors.price?.message}
              {...register("price", {
                required: "O preço do produto é obrigatório",
              })}
            />
          </div>

          <div className="mb-4">
            <Input
              crossOrigin=""
              type="text"
              label="Link da Imagem do Produto"
              {...register("image_url", {
                required: "O link da imagem do produto é obrigatório",
              })}
            />
          </div>

          <Textarea
            label="Descrição"
            error={!!errors.description?.message}
            {...register("description", {
              required: "A descrição do produto é obrigatória",
            })}
          />

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Produto</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
