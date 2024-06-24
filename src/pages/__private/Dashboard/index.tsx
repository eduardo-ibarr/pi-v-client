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
import jsPDF from "jspdf";
import { Button } from "@material-tailwind/react";

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

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let currentYPosition = 10;

    const countPages = pageViews.reduce((acc: any, pageView) => {
      acc[pageView.url] = (acc[pageView.url] || 0) + 1;
      return acc;
    }, {});

    const countProducts = productViews.reduce((acc: any, productView) => {
      acc[productView.product_name] = (acc[productView.product_name] || 0) + 1;
      return acc;
    }, {});

    const pageViewsString = Object.entries(countPages).reduce(
      (acc, [url, count]) => `${acc}${url}: ${count}\n`,
      ""
    );

    const productViewsString = Object.entries(countProducts).reduce(
      (acc, [product, count]) => `${acc}${product}: ${count}\n`,
      ""
    );

    doc.text("Relatório de Visualizações", 10, currentYPosition);
    currentYPosition += 10;

    doc.text("Contagem de Páginas por Visualização:", 10, currentYPosition);
    currentYPosition += 10;
    doc.text(pageViewsString, 10, currentYPosition);
    currentYPosition += 40;

    doc.text("Contagem de Produtos por Visualização:", 10, currentYPosition);
    currentYPosition += 10;
    doc.text(productViewsString, 10, currentYPosition);

    doc.save("relatorio.pdf");
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center flex-col">
          <h2 className="text-xl font-semibold mb-4">
            Linha do Tempo de Visualizações
          </h2>
          <PageAndProductLineChart
            pageViews={pageViews}
            productViews={productViews}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center flex-col">
          <h2 className="text-xl font-semibold mb-4">
            Visualizações por Página
          </h2>
          <PageViewsBarChart pageViews={pageViews} />
        </div>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow flex items-center flex-col">
        <h2 className="text-xl font-semibold mb-4 w-f">
          Visualizações por Produto
        </h2>
        <ProductViews productViews={productViews} />
      </div>

      <Button onClick={handleGeneratePDF} className="mt-4">
        Gerar relatório em PDF
      </Button>
    </div>
  );
};

export default AdminDashboard;
