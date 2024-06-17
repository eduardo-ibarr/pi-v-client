import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import useShowProduct from "../../../../hooks/products/useShowProduct";
import LoadingSpin from "../../../../components/LoadingSpin";
import { formatPrice } from "../../../../utils/format";
import { UpdateProductData } from "../../../../models/products";
import { useForm } from "react-hook-form";
import useUpdateProduct from "../../../../hooks/products/useUpdateProduct";

function ProductDetailsAdminPage() {
  const { productId } = useParams();
  const { data, isLoading, isError, error } = useShowProduct(productId || "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProductData>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      image_url: "",
      category_id: undefined,
    },
  });

  const { mutateAsync: update } = useUpdateProduct();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image_url: data.image_url,
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

  if (isLoading) return <LoadingSpin />;
  if (isError)
    return (
      <div>Error: {error?.message || "Failed to fetch product details"}</div>
    );

  return (
    <div className="p-4 overflow-y-auto">
      <div className="mb-8 h-full">
        <div className="p-4 flex flex-col md:flex-row">
          <img
            src={data.image_url}
            alt={data.name}
            className="md:w-48 md:h-48 w-full object-cover border-2 border-gray-200 rounded-md"
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
            <Typography className="font-semibold text-xl">
              {formatPrice(data.price)}
            </Typography>
          </div>
        </div>
        <div className="flex justify-end p-4 space-x-4">
          <Button onClick={() => setOpen(true)}>Editar</Button>
          <Button
            variant="outlined"
            onClick={() => alert("Confirmar exclusão?")}
          >
            Excluir
          </Button>
        </div>
      </div>
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
                Alterar Informações do Produto
              </Typography>

              <div className="mb-5">
                <Input
                  crossOrigin=""
                  type="text"
                  label="Nome"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name?.message}
                />
              </div>

              <div className="mb-3">
                <Textarea label="Descrição" {...register("description")} />
              </div>

              <div className="mb-6">
                <Input
                  crossOrigin=""
                  type="number"
                  step={0.01}
                  label="Preço"
                  {...register("price", { required: "Price is required" })}
                  error={!!errors.price?.message}
                />
              </div>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="text"
                  label="URL da imagem"
                  {...register("image_url")}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end space-x-4 p-4">
              <Button type="submit">Salvar alterações</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      )}
    </div>
  );
}

export default ProductDetailsAdminPage;
