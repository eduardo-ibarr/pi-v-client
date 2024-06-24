import React, { useState } from 'react';
import { Button, Typography, Input } from "@material-tailwind/react";

// Definir os tipos das props
interface ProductReviewProps {
  productId: number;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    console.log('Submitting review:', review, 'with rating:', rating);
    // Lógica para enviar a avaliação para o servidor
  };

  return (
    <div className="p-4 border-t border-gray-200 mt-4">
      <Typography variant="h6" className="font-bold">Avalie este Produto</Typography>
      <div>
        <Typography>Rating:</Typography>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => setRating(star)}>
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Escreva sua avaliação aqui..."
          crossOrigin={undefined}
        />
        <Button
          className="mt-2"
          onClick={handleReviewSubmit}
        >
          Enviar Avaliação
        </Button>
      </div>
    </div>
  );
};

export default ProductReview;
