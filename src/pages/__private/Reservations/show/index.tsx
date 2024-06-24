import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";
import useShowReservation from "../../../../hooks/reservations/useShowReservation";
import LoadingSpin from "../../../../components/LoadingSpin";
import { formatDate, formatPrice } from "../../../../utils/format";
import { UpdateReservationData } from "../../../../models/reservations";
import { useForm } from "react-hook-form";
import useUpdateReservation from "../../../../hooks/reservations/useUpdateReservation";
import useDeleteReservation from "../../../../hooks/reservations/useDeleteReservation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function ReservationDetailsAdminPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    // formState: { errors },
  } = useForm<UpdateReservationData>({
    defaultValues: {
      total_amount: 0,
      reservation_items: [],
    },
  });

  const { mutateAsync: update, isSuccess: isSuccessUpdate } =
    useUpdateReservation();
  const { mutateAsync: deleteReservation, isSuccess: isSuccessDelete } =
    useDeleteReservation();
  const { data, isLoading, isError, error } = useShowReservation(
    reservationId || ""
  );

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await deleteReservation(reservationId || "");
    setOpenDelete(false);
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        reservation_items: data.reservation_items,
        total_amount: data.total_amount,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UpdateReservationData) => {
    try {
      await update(formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      alert("Reserva atualizada com sucesso!");
    }

    if (isSuccessDelete) {
      alert("Reserva excluída com sucesso!");
      navigate(-1);
    }
  }, [isSuccessUpdate, isSuccessDelete, navigate]);

  if (isLoading) return <LoadingSpin />;
  if (isError)
    return (
      <div>
        Error: {error?.message || "Failed to fetch Reservation details"}
      </div>
    );

  if (!data) return <div>No Reservation found</div>;
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
                Detalhes da Reserva
              </Typography>
            </div>

            <Typography color="gray" className="mt-2">
              Informações detalhadas da reserva.
            </Typography>

            <div className="mt-6">
              <Typography color="blue-gray" className="font-bold mb-2">
                Nome do cliente: {data.user_name}
              </Typography>
              <Typography color="blue-gray" className="font-bold mb-2">
                Telefone do cliente: {data.user_phone}
              </Typography>

              <Typography color="blue-gray" className="font-bold mb-2">
                Total: {formatPrice(data.total_amount)}
              </Typography>

              <Typography color="blue-gray" className="font-bold mb-2">
                Data da reserva: {formatDate(data.reservation_timestamp)}
              </Typography>

              <Typography color="blue-gray" className="font-bold mb-2">
                Itens:
              </Typography>

              {data.reservation_items.map((item: any) => (
                <ul key={item.id} className="flex items-center space-x-4">
                  <li>
                    <Typography color="blue-gray">
                      {item.product_name}
                    </Typography>
                    <Typography color="blue-gray">
                      {formatPrice(item.price)}
                    </Typography>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={() => setOpen(true)}>Editar Informações</Button>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>
              Excluir Reserva
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
                Edição de Informações da Reserva
              </Typography>

              <div className="flex flex-col space-y-4">
                <Input
                  type="number"
                  {...register("total_amount")}
                  className="input"
                  label="Total"
                  crossOrigin={control}
                />
              </div>

              <Button onClick={handleDelete} className="mt-4">
                Produto já foi retirado
              </Button>
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
              Você tem certeza que deseja excluir este Reserva?
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

export default ReservationDetailsAdminPage;
