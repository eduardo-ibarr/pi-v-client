import { useState } from "react";
import useListreservations from "../../../hooks/reservations/useListReservations";
import LoadingSpin from "../../../components/LoadingSpin";
import { PencilIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import moment from "moment";
import { formatPrice } from "../../../utils/format";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { label: "Nome do Cliente", sortKey: "user_name" },
  { label: "Telefone", sortKey: "phone" },
  { label: "Valor Total", sortKey: "total_amount" },
  { label: "Data da Reserva", sortKey: "reservation_timestamp" },
  { label: "", sortKey: null },
];

const ITEMS_PER_PAGE = [3, 5, 10, 15, 20];

export default function AdminReservationsPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 3,
    sort: "name:ASC",
    search: "",
    sortDirection: "ASC",
  });

  const {
    data: reservationsData,
    isLoading,
    isError,
    error,
  } = useListreservations(queryParams);

  const navigate = useNavigate();

  const handleSortChange = (newSort: string) => {
    const sortDirection = queryParams.sortDirection === "ASC" ? "DESC" : "ASC";
    setQueryParams((prev) => ({
      ...prev,
      sortDirection,
      sort: `${newSort}:${sortDirection}`,
    }));
  };

  const handleNextPage = () => {
    setQueryParams((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handlePreviousPage = () => {
    setQueryParams((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };

  const handleLimitChange = (value: string | undefined) => {
    setQueryParams((prev) => ({
      ...prev,
      limit: parseInt(value ? value : "", 10),
      page: 1,
    }));
  };

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!reservationsData) {
    return null;
  }

  console.log(reservationsData);

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between gap-8">
        <Typography color="gray" className="mt-1 font-normal">
          Aqui você pode gerenciar todas as reservas.
        </Typography>
      </div>

      <div>
        <div className="flex justify-between items-center">
          {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row w-1/2">
            <Input
              crossOrigin=""
              label="Buscar uma reserva"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearchChange}
            />
          </div> */}

          {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={handleSeeAll}>
              Ver todos
            </Button>
          </div> */}
        </div>
      </div>

      <table className="my-6 w-full border border-gray-200 rounded-lg">
        <thead>
          <tr>
            {TABLE_HEAD.map(({ label, sortKey }) => (
              <th
                key={label}
                className="cursor-pointer border-y border-gray-100 bg-gray-200 p-4 transition-colors hover:bg-gray-100"
                onClick={() => sortKey && handleSortChange(sortKey)}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none"
                >
                  {label}
                  {sortKey && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservationsData.items.map(
            (
              {
                user_name,
                id,
                reservation_timestamp,
                total_amount,
                user_phone,
              },
              index
            ) => {
              const isLast = index === reservationsData.items.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-50";

              return (
                <tr key={index} className="even:bg-gray-100">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user_name}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user_phone}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPrice(parseFloat(total_amount))}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(reservation_timestamp).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar">
                      <IconButton
                        variant="text"
                        onClick={() => navigate(`/admin/reservations/${id}`)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className=" border justify-self-end">
          <Select label="Itens por página" onChange={handleLimitChange}>
            {ITEMS_PER_PAGE.map((item) => (
              <Option key={item} value={String(item)}>
                {item}
              </Option>
            ))}
          </Select>
        </div>

        <Typography variant="small" color="blue-gray" className="font-normal">
          Página {reservationsData.page} de {reservationsData.totalPages}
        </Typography>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePreviousPage}
            disabled={reservationsData.page <= 1}
          >
            Página Anterior
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNextPage}
            disabled={reservationsData.page >= reservationsData.totalPages}
          >
            Próxima Página
          </Button>
        </div>
      </div>
    </div>
  );
}
