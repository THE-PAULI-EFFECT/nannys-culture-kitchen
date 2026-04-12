
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container p-4 md:p-6 max-w-7xl">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
