import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

interface AdminDashboardProps {
  userName: string;
}

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const salesData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#3182CE",
      },
    ],
  };

  const trafficData = {
    labels: ["Direto", "Orgânico", "Redes Sociais", "Referência"],
    datasets: [
      {
        label: "Tráfego de Usuários",
        data: [300, 200, 500, 100],
        backgroundColor: ["#4A5568", "#63B3ED", "#38A169", "#ECC94B"],
      },
    ],
  };

  const popularCategoriesData = {
    labels: ["Roupas", "Calçados", "Acessórios", "Bolsas", "Eletrônicos"],
    datasets: [
      {
        label: "Categorias Populares",
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#F6AD55",
          "#4FD1C5",
          "#818CF8",
          "#A5B4FC",
          "#F687B3",
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Vendas Mensais</h2>
            <Bar data={salesData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Tráfego de Usuários</h2>
            <Doughnut data={trafficData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Categorias Populares</h2>
            <Doughnut data={popularCategoriesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
