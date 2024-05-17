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
import ProductDetails from "./pages/ProductDetails"; // Adicione a importação do ProductDetails
import Layout from "./styles/Layout";

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
      }, // Rota principal da home
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage userName="" /> },
          { path: "products", element: <ProductsPage /> },
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
