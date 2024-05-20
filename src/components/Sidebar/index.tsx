import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  // PresentationChartBarIcon,
  // ShoppingBagIcon,
  // UserCircleIcon,
  // Cog6ToothIcon,
  // InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import useTokenData from "../../hooks/app/useTokenData";
import { useNavigate } from "react-router-dom";

export default function DefaultSidebar() {
  const tokenData = useTokenData();
  const navigate = useNavigate();

  if (tokenData?.role === "admin") {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Menu de Navegação
          </Typography>
        </div>

        <List>
          {/* <ListItem onClick={() => navigate("/admin/dashboard")}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>

          <ListItem onClick={() => navigate("/admin/products")}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Produtos
          </ListItem>

          <ListItem onClick={() => navigate("/admin/orders")}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Pedidos
          </ListItem>

          <ListItem onClick={() => navigate("/admin/users")}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Usuários
          </ListItem>

          <ListItem onClick={() => navigate("/admin/config")}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Configurações
          </ListItem> */}

          <ListItem
            onClick={() => {
              if (tokenData) {
                navigate("/logout");
              } else {
                navigate("/login");
              }
            }}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            {tokenData ? "Sair" : "Entrar"}
          </ListItem>
        </List>
      </Card>
    );
  }

  if (tokenData?.role === "user" || !tokenData?.role) {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          {/* <ListItem onClick={() => navigate("/dashboard")}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Produtos
          </ListItem>

          <ListItem onClick={() => navigate("/orders")}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Pedidos
          </ListItem>

          <ListItem onClick={() => navigate("/config")}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Configurações
          </ListItem> */}

          <ListItem
            onClick={() => {
              if (tokenData) {
                navigate("/logout");
              } else {
                navigate("/login");
              }
            }}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            {tokenData ? "Sair" : "Entrar"}
          </ListItem>
        </List>
      </Card>
    );
  }

  return null;
}
