import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CreateCategoryData } from "../../../../models/categories";
import useCreateCategory from "../../../../hooks/categories/useCreateCategory";
import { useEffect } from "react";

export default function CreateCategoryPage() {
  const { mutateAsync: create, isSuccess } = useCreateCategory();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategoryData>({});

  const onSubmit = async (data: CreateCategoryData) => {
    await create(data);
    reset();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Categoria cadastrada com sucesso!");
      navigate("/admin/categories");
    }
  }, [isSuccess, navigate]);

  return (
    <Card className="m-4">
      <CardBody>
        <div className="flex items-center mb-4">
          <IconButton onClick={handleCancel} variant="text" color="gray">
            <ArrowLeftIcon className="h-5 w-5" />
          </IconButton>
          <Typography variant="h5" className="ml-2 text-black">
            Cadastro de Categoria
          </Typography>
        </div>

        <Typography color="gray">
          Preencha os campos abaixo para cadastrar uma nova categoria.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Input
              crossOrigin=""
              type="text"
              label="Nome da categoria"
              error={!!errors.name?.message}
              {...register("name", {
                required: "O nome da categoria é obrigatório",
              })}
            />
          </div>

          <Textarea
            label="Descrição"
            error={!!errors.description?.message}
            {...register("description", {
              required: "A descrição da categoria é obrigatória",
            })}
          />

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar categoria</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
