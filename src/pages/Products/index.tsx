import LoadingSpin from "../../components/LoadingSpin";
import { ProductCard } from "../../components/ProductCard";
import useListProducts from "../../hooks/products/useListProducts";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useListProducts({
    limit: 6,
    page: 1,
    search: undefined,
    sort: undefined,
  });

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <p>Erro ao carregar produtos. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!products || products.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <p>Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center">Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {products.items.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
