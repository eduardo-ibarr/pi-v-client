import { useState } from "react";
import useListCategories from "../../../hooks/categories/useListCategories";
import { PencilIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../models/categories";
import LoadingSpin from "../../../components/LoadingSpin";

const TABLE_HEAD = [
  { label: "Nome", sortKey: "name" },
  { label: "Criada em", sortKey: "created_at" },
  { label: "", sortKey: null },
];

export default function AdminCategoriesPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 3,
    sort: "name:ASC",
    search: "",
    sortDirection: "ASC",
  });

  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
  } = useListCategories();

  const navigate = useNavigate();

  const handleSortChange = (newSort: string) => {
    const sortDirection = queryParams.sortDirection === "ASC" ? "DESC" : "ASC";
    setQueryParams((prev) => ({
      ...prev,
      sortDirection,
      sort: `${newSort}:${sortDirection}`,
    }));
  };

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!categoriesData) {
    return null;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between gap-8">
        <Typography color="gray" className="mt-1 font-normal">
          Aqui você pode gerenciar todas as categorias cadastradas.
        </Typography>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => navigate("/admin/categories/new")}
            >
              <PencilIcon strokeWidth={2} className="h-4 w-4" />
              Adicionar Categoria
            </Button>
          </div>
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
          {(categoriesData as Category[]).map(
            ({ created_at, name, id }, index) => {
              const isLast = index === categoriesData.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-50";

              return (
                <tr key={index} className="even:bg-gray-100">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(created_at).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar">
                      <IconButton
                        variant="text"
                        onClick={() => navigate(`/admin/categories/${id}`)}
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
    </div>
  );
}
