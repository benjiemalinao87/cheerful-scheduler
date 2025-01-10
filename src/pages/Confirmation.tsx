import { CheckCircle2, Clock, MessageCircle, CalendarCheck, Calendar } from "lucide-react";
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

  // Format date and time for calendar links
  const eventDate = new Date(booking.date);
  const [hours, minutes] = booking.time.split(':');
  eventDate.setHours(parseInt(hours), parseInt(minutes));
  const endDate = new Date(eventDate.getTime() + 30 * 60000); // 30 minutes later

  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const eventTitle = `Product Demo Meeting`;
  const eventDescription = `Product demonstration for ${booking.productInterest}. Please come prepared with any questions you may have.`;
  const eventLocation = "Online Meeting";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDateForCalendar(eventDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${eventDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  const icsCalendarData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDateForCalendar(eventDate)}
DTEND:${formatDateForCalendar(endDate)}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

  const downloadICSFile = () => {
    const blob = new Blob([icsCalendarData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

          {/* Calendar Integration */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                Add to Calendar
              </h2>
              <div className="flex flex-wrap gap-3">
                <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" 
                         alt="Google Calendar" 
                         className="w-4 h-4" />
                    Google Calendar
                  </Button>
                </a>
                <a href={outlookCalendarUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
                         alt="Outlook Calendar"
                         className="w-4 h-4" />
                    Outlook Calendar
                  </Button>
                </a>
                <Button variant="outline" className="flex items-center gap-2" onClick={downloadICSFile}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
                       alt="iCal"
                       className="w-4 h-4" />
                  Download for iPhone/iCal
                </Button>
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