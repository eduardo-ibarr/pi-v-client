import { Spinner } from "@material-tailwind/react";

export default function LoadingSpin() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <Spinner className="h-12 w-12" />
    </div>
  );
}
