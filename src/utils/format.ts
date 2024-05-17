export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};
