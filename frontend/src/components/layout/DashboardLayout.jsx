import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Header />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;