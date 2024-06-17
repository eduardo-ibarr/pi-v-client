import { useForm } from "react-hook-form";
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
import useListCategories from "../../../../hooks/categories/useListProducts";
import LoadingSpin from "../../../../components/LoadingSpin";

export default function CreateProductPage() {
  const { data: categories, isLoading } = useListCategories();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", data.image[0]); // Append the file

    // TODO: Send formData to the server
    alert("Product has been submitted!");
    reset();
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const imageFile = watch("image"); // Watch the image file input

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (!categories) {
    return <div>No categories found</div>;
  }

  console.log("Categories:", categories);

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
            <Select label="Selecione uma categoria">
              {categories.map((category) => (
                <Option key={category.id} value={String(category.id)}>
                  {category.name}
                </Option>
              ))}
            </Select>
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

          <Textarea
            label="Descrição"
            error={!!errors.description?.message}
            {...register("description", {
              required: "A descrição do produto é obrigatória",
            })}
          />

          <div className="my-4 max-w-96">
            <Input
              crossOrigin=""
              type="file"
              label="Imagem do Produto"
              {...register("image", {
                required: "A imagem do produto é obrigatória",
              })}
              accept="image/*"
              // error={errors.image && "A imagem do produto é obrigatória"}
            />
            {imageFile && imageFile[0] && (
              <div className="p-2">
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Preview"
                  className="w-32 h-32 mt-2 rounded-md object-cover shadow-md"
                  onLoad={() =>
                    URL.revokeObjectURL(URL.createObjectURL(imageFile[0]))
                  }
                />

                <Typography color="gray" className="mt-2 text-sm">
                  {imageFile[0].name}
                </Typography>
              </div>
            )}
          </div>

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
