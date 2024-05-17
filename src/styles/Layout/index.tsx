// Layout.tsx
import { ReactNode } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className=" flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
