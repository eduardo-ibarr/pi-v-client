import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPendingPurchases = async () => {
  const { data } = await axios.get('/api/purchases/pending');
  return data;
};

const useListPendingPurchases = () => {
  return useQuery({
    queryKey: ['pendingPurchases'],
    queryFn: fetchPendingPurchases,
  });
};

export default useListPendingPurchases;
