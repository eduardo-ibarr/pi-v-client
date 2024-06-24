import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Card,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import useShowCategory from "../../../../hooks/categories/useShowCategory";
import LoadingSpin from "../../../../components/LoadingSpin";
import { UpdateCategoryData } from "../../../../models/categories";
import { useForm } from "react-hook-form";
import useUpdateCategory from "../../../../hooks/categories/useUpdateCategory";
import useDeleteCategory from "../../../../hooks/categories/useDeleteCategory";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useListCategories from "../../../../hooks/categories/useListCategories";

function CategoryDetailsAdminPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutateAsync: update, isSuccess: isSuccessUpdate } =
    useUpdateCategory();
  const { mutateAsync: deleteCategory, isSuccess: isSuccessDelete } =
    useDeleteCategory();
  const { data, isLoading, isError, error } = useShowCategory(categoryId || "");
  const { data: categories } = useListCategories();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await deleteCategory(categoryId || "");
    setOpenDelete(false);
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UpdateCategoryData) => {
    try {
      await update(formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      alert("Categoria atualizada com sucesso!");
    }

    if (isSuccessDelete) {
      alert("Categoria excluída com sucesso!");
      navigate(-1);
    }
  }, [isSuccessUpdate, isSuccessDelete, navigate]);

  if (isLoading) return <LoadingSpin />;
  if (isError)
    return (
      <div>Error: {error?.message || "Failed to fetch Category details"}</div>
    );

  if (!data) return <div>No Category found</div>;
  if (!categories) return <div>No categories found</div>;

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Card className="m-4 h-[94%] flex flex-col">
        <CardBody className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center">
              <IconButton onClick={handleCancel} variant="text" color="gray">
                <ArrowLeftIcon className="h-5 w-5" />
              </IconButton>
              <Typography variant="h5" className="ml-2 text-black">
                Detalhes da Categoria
              </Typography>
            </div>

            <Typography color="gray" className="mt-2">
              Informações detalhadas do Categoria.
            </Typography>

            <div className="mt-8">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold mb-2"
              >
                {data.name}
              </Typography>
              <Typography color="blue-gray" className="mb-4">
                {data.description}
              </Typography>
              <Typography variant="h6" color="gray" className="mb-2">
                Criado em: {new Date(data.created_at).toLocaleString()}
              </Typography>
              <Typography variant="h6" color="gray">
                Atualizado em: {new Date(data.updated_at).toLocaleString()}
              </Typography>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={() => setOpen(true)}>Editar Informações</Button>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>
              Excluir Categoria
            </Button>
          </div>
        </CardBody>
      </Card>

      {open && (
        <Dialog
          size="md"
          className="h-[90%]"
          open={open}
          handler={() => setOpen(false)}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full"
          >
            <DialogBody className="p-6">
              <Typography variant="h5" color="gray" className="mb-6">
                Edição de Informações da Categoria
              </Typography>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="text"
                  label="Nome"
                  {...register("name", { required: "Nome é obrigatório" })}
                  error={!!errors.name?.message}
                />
              </div>

              <div className="mb-2">
                <Textarea
                  label="Descrição"
                  {...register("description", {
                    required: "Descrição é obrigatória",
                  })}
                  error={!!errors.description?.message}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end space-x-4 p-4 mr-2">
              <Button type="submit">Salvar alterações</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      )}

      {openDelete && (
        <Dialog
          size="sm"
          className=""
          open={openDelete}
          handler={() => setOpenDelete(false)}
        >
          <DialogBody className="p-6 flex justify-center items-center h-full">
            <Typography variant="h5" color="black" className="mt-6">
              Você tem certeza que deseja excluir esta categoria?
            </Typography>
          </DialogBody>

          <DialogFooter className="flex justify-end space-x-4 p-4">
            <Button onClick={handleDelete}>Sim, excluir</Button>
            <Button variant="outlined" onClick={() => setOpenDelete(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}

export default CategoryDetailsAdminPage;
