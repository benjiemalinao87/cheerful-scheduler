import { CheckCircle2, Clock, MessageCircle, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
          {/* Confirmation Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for scheduling a meeting, {booking.firstName}! We've sent a confirmation email to {booking.email}.
            </p>
          </div>

          {/* Appointment Details */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-gray-500" />
                Appointment Details
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Time: {booking.time}</p>
                <p>Product Interest: {booking.productInterest}</p>
              </div>
            </CardContent>
          </Card>

          {/* What to Expect Section */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-gray-500" />
                What to Expect During Your Appointment
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">30-Minute Product Demo</p>
                    <p>Our expert will walk you through the key features and benefits of our product, tailored to your needs.</p>
                  </div>
                </div>
                <ul className="list-disc pl-9 space-y-2">
                  <li>Interactive demonstration of the product</li>
                  <li>Opportunity to ask questions and discuss your specific requirements</li>
                  <li>Discussion of pricing and implementation options</li>
                  <li>Next steps and follow-up plan</li>
                </ul>
                <p className="text-sm mt-4">
                  Pro tip: Have your questions ready and feel free to invite team members who might benefit from the demo!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={() => navigate("/")} variant="outline">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;