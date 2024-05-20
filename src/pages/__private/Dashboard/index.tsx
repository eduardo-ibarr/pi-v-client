import React from "react";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import useListPageViews from "../../../hooks/trackings/useListPageViews";
import useListProductViews from "../../../hooks/trackings/useListProductViews";
import PageViewsBarChart from "./components/PageViewsBarChart";
import PageAndProductLineChart from "./components/PageAndProductLineChart";
import ProductViews from "./components/ProductViews";

interface AdminDashboardProps {
  userName: string;
}

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const { data: pageViews, isLoading: isLoadingPageViews } = useListPageViews();
  const { data: productViews, isLoading: isLoadingProductViews } =
    useListProductViews();

  if (isLoadingPageViews || isLoadingProductViews) {
    return <div>Loading...</div>;
  }

  if (!pageViews || !productViews) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Linha do Tempo de Visualizações
            </h2>
            <PageAndProductLineChart
              pageViews={pageViews}
              productViews={productViews}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Visualizações por Página
            </h2>
            <PageViewsBarChart pageViews={pageViews} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Visualizações por Produto
            </h2>
            <ProductViews productViews={productViews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
