import { Card } from "@material-tailwind/react";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

interface Props {
  pageName: string;
}

export default function AdminSidebar({ pageName }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="h-auto w-64 rounded-none bg-gray-200 shadow-md flex flex-col">
      <div className="px-5 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-black text-center">{pageName}</h1>
      </div>

      <ul className="flex flex-col flex-grow p-4">
        <SidebarItem
          label="Dashboard"
          onClick={() => navigate("/admin/dashboard")}
        />
        <SidebarItem
          label="Produtos"
          onClick={() => navigate("/admin/products")}
        />
        <SidebarItem
          label="Categorias"
          onClick={() => navigate("/admin/categories")}
        />
        <SidebarItem
          label="Usuários"
          onClick={() => navigate("/admin/users")}
        />
        <SidebarItem
          label="Reservas"
          onClick={() => navigate("/admin/reservations")}
        />
        <SidebarItem
          label="Sair do sistema"
          onClick={() => navigate("/logout")}
        />
      </ul>
    </Card>
  );
}
