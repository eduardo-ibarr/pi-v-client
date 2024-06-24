import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UpdatePurchaseStatusParams {
  purchaseId: string;
  status: string;
}

const updatePurchaseStatus = async ({ purchaseId, status }: UpdatePurchaseStatusParams) => {
  const { data } = await axios.post(`/api/purchases/${purchaseId}/status`, { status });
  return data;
};

const useUpdatePurchaseStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePurchaseStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingPurchases'] });
    },
  });
};

export default useUpdatePurchaseStatus;
