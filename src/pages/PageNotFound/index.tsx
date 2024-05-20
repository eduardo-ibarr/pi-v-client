import { useEffect } from "react";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";

function PageNotFound() {
  const { mutateAsync: sendTrack } = useSendPageViewTrack();

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/404",
      user_id: null,
    });
  }, [sendTrack]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-lg text-gray-600">
          A página que você está procurando não foi encontrada.
        </p>
        <p className="text-lg text-gray-600">
          Por favor, verifique o URL digitado e tente novamente.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
