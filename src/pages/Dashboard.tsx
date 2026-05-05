import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Add dashboard content here */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;