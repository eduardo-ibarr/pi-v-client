import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import useListPendingPurchases from '../../../../../hooks/purchases/useListPendingPurchases';
import useUpdatePurchaseStatus from '../../../../../hooks/purchases/useUpdatePurchaseStatus';

const PendingPurchases = () => {
  const { data: purchases, isLoading, isError } = useListPendingPurchases();
  const { mutate: updateStatus } = useUpdatePurchaseStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading purchases</div>;
  }

  const handleApprove = (purchaseId: string) => {
    updateStatus({ purchaseId, status: 'approved' });
  };

  const handleReject = (purchaseId: string) => {
    updateStatus({ purchaseId, status: 'rejected' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center flex-col">
      <Typography variant="h5" className="mb-4">Pending Purchases</Typography>
      {purchases.map((purchase: any) => (
        <div key={purchase.id} className="flex justify-between items-center w-full mb-4">
          <Typography>{purchase.productName} - {purchase.userName}</Typography>
          <div>
            <Button color="green" onClick={() => handleApprove(purchase.id)}>Approve</Button>
            <Button color="red" onClick={() => handleReject(purchase.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingPurchases;
