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
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";
import useShowProduct from "../../../../hooks/products/useShowProduct";
import LoadingSpin from "../../../../components/LoadingSpin";
import { formatPrice } from "../../../../utils/format";
import { UpdateProductData } from "../../../../models/products";
import { Controller, useForm } from "react-hook-form";
import useUpdateProduct from "../../../../hooks/products/useUpdateProduct";
import useDeleteProduct from "../../../../hooks/products/useDeleteProduct";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useListCategories from "../../../../hooks/categories/useListCategories";

const options = [
  { id: 1, name: "available", label: "Disponível" },
  { id: 2, name: "reserved", label: "Reservado" },
];

function ProductDetailsAdminPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateProductData>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      image_url: "",
      status: "",
      category_id: undefined,
    },
  });

  const { mutateAsync: update, isSuccess: isSuccessUpdate } =
    useUpdateProduct();
  const { mutateAsync: deleteProduct, isSuccess: isSuccessDelete } =
    useDeleteProduct();
  const { data, isLoading, isError, error } = useShowProduct(productId || "");
  const { data: categories } = useListCategories();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(productId || "");
    setOpenDelete(false);
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image_url: data.image_url,
        status: data.status,
        category_id: data.category_id,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UpdateProductData) => {
    try {
      await update(formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      alert("Produto atualizado com sucesso!");
    }

    if (isSuccessDelete) {
      alert("Produto excluído com sucesso!");
      navigate(-1);
    }
  }, [isSuccessUpdate, isSuccessDelete, navigate]);

  if (isLoading) return <LoadingSpin />;
  if (isError)
    return (
      <div>Error: {error?.message || "Failed to fetch product details"}</div>
    );

  if (!data) return <div>No product found</div>;
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
                Detalhes do Produto
              </Typography>
            </div>

            <Typography color="gray" className="mt-2">
              Informações detalhadas do produto.
            </Typography>

            <div className="mt-6 flex flex-col md:flex-row">
              <img
                src={data.image_url}
                alt={data.name}
                className="md:w-60 md:h-6w-60 w-full object-cover border-2 border-gray-200 rounded-md"
              />
              <div className="md:ml-6 mt-4 md:mt-0">
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
                <Chip
                  variant="ghost"
                  size="sm"
                  className="w-32 items-center justify-center mb-2"
                  value={
                    data.status === "available" ? "Disponível" : "Reservado"
                  }
                  color={data.status === "available" ? "green" : "blue-gray"}
                />
                <Typography className="font-semibold text-xl">
                  {formatPrice(data.price)}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={() => setOpen(true)}>Editar Informações</Button>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>
              Excluir Produto
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
                Edição de Informações do Produto
              </Typography>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="text"
                  label="Nome"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name?.message}
                />
              </div>

              <div className="mb-2">
                <Textarea label="Descrição" {...register("description")} />
              </div>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="number"
                  step={0.01}
                  label="Preço"
                  {...register("price", { required: "Price is required" })}
                  error={!!errors.price?.message}
                />
              </div>

              <div className="mb-4 flex space-x-6">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      label="Status"
                      error={!!errors.status?.message}
                      {...field}
                    >
                      {options.map((status) => (
                        <Option key={status.id} value={status.name}>
                          {status.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                />

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
                        <Option key={category.id} value={String(category.id)}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <div>
                <Input
                  crossOrigin=""
                  type="text"
                  label="URL da imagem"
                  {...register("image_url")}
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
              Você tem certeza que deseja excluir este produto?
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

export default ProductDetailsAdminPage;
