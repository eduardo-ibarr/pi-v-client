import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteObject } from "react-router-dom";

import RegisterPage from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./styles/Layout";
import useTokenData from "./hooks/app/useTokenData";
import DashboardPage from "./pages/__private/Dashboard";

const queryClient = new QueryClient();

const privateRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <Layout>
        {/* <ProductsPage /> */}
        <p>Products</p>
      </Layout>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Layout>
        {/* <OrdersPage /> */}
        <p>Orders</p>
      </Layout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <Layout>
        {/* <UsersPage /> */}
        <p>Users</p>
      </Layout>
    ),
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Layout>
        <ForgotPassword />
      </Layout>
    ),
  },
];

export default function App() {
  const tokenData = useTokenData();

  const routes = [
    {
      path: "*",
      element: <PageNotFound />,
    },
    ...publicRoutes,
    ...(tokenData?.role === "admin" ? privateRoutes : []),
  ];

  const router = createBrowserRouter(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
