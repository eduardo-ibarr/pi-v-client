import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Card,
  CardBody,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import LoadingSpin from "../../../../components/LoadingSpin";
import useListCategories from "../../../../hooks/categories/useListProducts";
import useShowUser from "../../../../hooks/users/useShowUser";
import useUpdateUser from "../../../../hooks/users/useUpdateUser";
import useDeleteUser from "../../../../hooks/users/useDeleteUser";
import { UpdateProfileData } from "../../../../models/users";

const options = [
  { id: 1, name: "user", label: "Usuário" },
  { id: 2, name: "admin", label: "Administrador" },
];

function UserDetailsAdminPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      role: "",
    },
  });

  const { mutateAsync: update, isSuccess: isSuccessUpdate } = useUpdateUser();
  const { mutateAsync: deleteUser, isSuccess: isSuccessDelete } =
    useDeleteUser();
  const { data, isLoading, isError, error } = useShowUser(
    parseInt(userId || "")
  );
  const { data: categories } = useListCategories();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await deleteUser(userId || "");
    setOpenDelete(false);
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UpdateProfileData) => {
    try {
      await update(formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      alert("Usuário atualizado com sucesso!");
    }

    if (isSuccessDelete) {
      alert("Usuário excluído com sucesso!");
      navigate(-1);
    }
  }, [isSuccessUpdate, isSuccessDelete, navigate]);

  if (isLoading) return <LoadingSpin />;
  if (isError)
    return <div>Error: {error?.message || "Failed to fetch User details"}</div>;

  if (!data) return <div>No User found</div>;
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
                Detalhes do Usuário
              </Typography>
            </div>

            <Typography color="gray" className="mt-2">
              Informações detalhadas do usuário.
            </Typography>

            <div className="mt-6">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold mb-2"
              >
                {data.name}
              </Typography>
              <Typography color="blue-gray">Telefone: {data.phone}</Typography>
              <Typography color="blue-gray">Email: {data.email}</Typography>
              <Typography color="blue-gray">
                Função: {data.role === "admin" ? "Administrador" : "Usuário"}
              </Typography>
              <Typography color="blue-gray">
                Criado em: {new Date(data.created_at).toLocaleDateString()}
              </Typography>
              <Typography color="blue-gray">
                Atualizado em: {new Date(data.updated_at).toLocaleDateString()}
              </Typography>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={() => setOpen(true)}>Editar Informações</Button>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>
              Excluir usuário
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
                Edição de Informações do Usuário
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

              <div className="mb-4 flex space-x-6">
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select label="Função" {...field}>
                      {options.map((status) => (
                        <Option key={status.id} value={status.name}>
                          {status.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="email"
                  label="Email"
                  {...register("email", { required: "Email é obrigatório" })}
                  error={!!errors.email?.message}
                />
              </div>

              <div className="mb-4">
                <Input
                  crossOrigin=""
                  type="text"
                  label="Telefone"
                  {...register("phone", { required: "Telefone é obrigatório" })}
                  error={!!errors.phone?.message}
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
              Você tem certeza que deseja excluir este usuário?
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

export default UserDetailsAdminPage;
