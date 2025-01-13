import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  console.log("Index page rendered");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Scheduler</h1>
        <p className="text-gray-600">Book your appointment in just a few clicks</p>
        <Button 
          size="lg"
          onClick={() => {
            console.log("Schedule Meeting button clicked");
            navigate("/schedule");
          }}
        >
          Schedule Meeting
        </Button>
      </div>
    </div>
  );
};

export default Index;