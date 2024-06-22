import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import useTokenData from "./hooks/app/useTokenData";
import DashboardPage from "./pages/__private/Dashboard";
import ProductsPage from "./pages/__private/Products";
import ProductDetailsAdminPage from "./pages/__private/Products/show";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./styles/Layout";
import Logout from "./pages/Logout";
import CreateProductPage from "./pages/__private/Products/create";
import AdminLayout from "./styles/AdminLayout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <Layout>
            <HomePage />
          </Layout>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: (
              <AdminLayout pageName="Dashboard">
                <DashboardPage userName="" />
              </AdminLayout>
            ),
          },
          {
            path: "products",
            element: (
              <AdminLayout pageName="Página de Produtos">
                <ProductsPage />
              </AdminLayout>
            ),
          },
          {
            path: "products/:productId",
            element: (
              <AdminLayout pageName="Detalhes do Produto">
                <ProductDetailsAdminPage />
              </AdminLayout>
            ),
          },
          {
            path: "products/new",
            element: (
              <AdminLayout pageName="Novo Produto">
                <CreateProductPage />
              </AdminLayout>
            ),
          },
          { path: "categories", element: <p>Categories</p> },
          { path: "orders", element: <p>Orders</p> },
          { path: "users", element: <p>Users</p> },
        ],
      },
      {
        path: "products/:productId",
        element: (
          <Layout>
            <ProductDetails />
          </Layout>
        ),
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function ProtectedRoute() {
  const tokenData = useTokenData();
  const hasAccess = Boolean(tokenData);

  return <div>{hasAccess ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default function App() {
  console.log("App render");
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
