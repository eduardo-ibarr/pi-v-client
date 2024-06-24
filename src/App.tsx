import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import useTokenData from "./hooks/app/useTokenData";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/PageNotFound";
import ProductDetails from "./pages/ProductDetails";
import RegisterPage from "./pages/Register";
import AdminCategoriesPage from "./pages/__private/Categories";
import CreateCategoryPage from "./pages/__private/Categories/create";
import CategoryDetailsAdminPage from "./pages/__private/Categories/show";
import CreateProductPage from "./pages/__private/Products/create";
import ProductDetailsAdminPage from "./pages/__private/Products/show";
import AdminUsersPage from "./pages/__private/Users";
import UserDetailsAdminPage from "./pages/__private/Users/show";
import AdminLayout from "./styles/AdminLayout";
import AdminReservationsPage from "./pages/__private/Reservations";
import ReservationDetailsAdminPage from "./pages/__private/Reservations/show";
import Layout from "./styles/Layout";
import AdminProductsPage from "./pages/__private/Products";
import AdminDashboard from "./pages/__private/Dashboard";

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
                <AdminDashboard userName="" />
              </AdminLayout>
            ),
          },
          {
            path: "categories",
            element: (
              <AdminLayout pageName="Página de Categorias">
                <AdminCategoriesPage />
              </AdminLayout>
            ),
          },
          {
            path: "categories/:categoryId",
            element: (
              <AdminLayout pageName="Detalhes da Categoria">
                <CategoryDetailsAdminPage />
              </AdminLayout>
            ),
          },
          {
            path: "categories/new",
            element: (
              <AdminLayout pageName="Nova Categoria">
                <CreateCategoryPage />
              </AdminLayout>
            ),
          },
          {
            path: "products",
            element: (
              <AdminLayout pageName="Página de Produtos">
                <AdminProductsPage />
              </AdminLayout>
            ),
          },
          {
            path: "reservations",
            element: (
              <AdminLayout pageName="Reservas">
                <AdminReservationsPage />
              </AdminLayout>
            ),
          },
          {
            path: "reservations/:reservationId",
            element: (
              <AdminLayout pageName="Detalhes da Reserva">
                <ReservationDetailsAdminPage />
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
          {
            path: "users",
            element: (
              <AdminLayout pageName="Usuários">
                <AdminUsersPage />
              </AdminLayout>
            ),
          },
          {
            path: "users/:userId",
            element: (
              <AdminLayout pageName="Detalhes do Usuário">
                <UserDetailsAdminPage />
              </AdminLayout>
            ),
          },
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
  const hasAccess = tokenData?.role === "admin";

  return <div>{hasAccess ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
