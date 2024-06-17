import { ReactNode } from "react";
import AdminSidebar from "../../components/AdminSidebar";

interface Props {
  children: ReactNode;
  pageName: string;
}

export default function AdminLayout({ children, pageName }: Props) {
  return (
    <div className="flex flex-row min-h-screen">
      <AdminSidebar pageName={pageName} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
