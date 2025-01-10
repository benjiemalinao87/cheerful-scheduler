import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const lastBooking = localStorage.getItem("lastBooking");
    if (lastBooking) {
      setBooking(JSON.parse(lastBooking));
    }
  }, []);

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for scheduling a meeting, {booking.firstName}! We've sent a confirmation email to {booking.email}.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Appointment Details</h2>
            <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Time: {booking.time}</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;