import { useState, useCallback } from "react";
import { debounce } from "lodash";
import useListProducts from "../../../hooks/products/useListProducts";
import LoadingSpin from "../../../components/LoadingSpin";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Input,
  Button,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import moment from "moment";
import { formatPrice } from "../../../utils/format";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { label: "Nome", sortKey: "name" },
  { label: "Categoria", sortKey: "category_name" },
  { label: "Status", sortKey: "is_active" },
  { label: "Criado em", sortKey: "created_at" },
  { label: "", sortKey: null },
];

const ITEMS_PER_PAGE = [3, 5, 10, 15, 20];

export default function AdminProductsPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 3,
    sort: "name:ASC",
    search: "",
    sortDirection: "ASC",
  });

  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useListProducts(queryParams);

  const navigate = useNavigate();

  const handleSortChange = (newSort: string) => {
    const sortDirection = queryParams.sortDirection === "ASC" ? "DESC" : "ASC";
    setQueryParams((prev) => ({
      ...prev,
      sortDirection,
      sort: `${newSort}:${sortDirection}`,
    }));
  };

  const debouncedSearch = useCallback(
    debounce((newSearch) => {
      setQueryParams((prev) => ({
        ...prev,
        search: newSearch,
        page: 1,
      }));
    }, 1000),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleSeeAll = () => {
    setQueryParams((prev) => ({
      ...prev,
      search: "",
      page: 1,
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

  if (!productsData) {
    return null;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between gap-8">
        <Typography color="gray" className="mt-1 font-normal">
          Aqui você pode gerenciar todos os produtos cadastrados.
        </Typography>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row w-1/2">
            <Input
              crossOrigin=""
              label="Buscar um produto"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={handleSeeAll}>
              Ver todos
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => navigate("/admin/products/new")}
            >
              <PencilIcon strokeWidth={2} className="h-4 w-4" />
              Adicionar Produto
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
          {productsData.items.map(
            (
              { category_name, name, price, image_url, created_at, status, id },
              index
            ) => {
              const isLast = index === productsData.items.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-50";

              return (
                <tr key={index} className="even:bg-gray-100">
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={image_url} alt={name} size="sm" />

                      <div>
                        <Tooltip content={name}>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            {name.length > 30
                              ? name.substring(0, 30) + "..."
                              : name}
                          </Typography>
                        </Tooltip>

                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {formatPrice(price)}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      className="items-center justify-center w-28"
                      value={
                        status === "available" ? "Disponível" : "Reservado"
                      }
                      color={status === "available" ? "green" : "blue-gray"}
                    />
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
                        onClick={() => navigate(`/admin/products/${id}`)}
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
          Página {productsData.page} de {productsData.totalPages}
        </Typography>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePreviousPage}
            disabled={productsData.page <= 1}
          >
            Página Anterior
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNextPage}
            disabled={productsData.page >= productsData.totalPages}
          >
            Próxima Página
          </Button>
        </div>
      </div>
    </div>
  );
}
