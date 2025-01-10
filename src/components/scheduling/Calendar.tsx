import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { BookingModal } from "./BookingModal";
import { Button } from "@/components/ui/button";

const AVAILABLE_TIMES = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Select Date & Time</h2>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6; // Disable weekends
            }}
          />
        </div>

        {date && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Available Times</h3>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_TIMES.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  onClick={() => handleTimeSelect(time)}
                  className="w-full justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {showModal && (
          <BookingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            date={date!}
            time={selectedTime!}
          />
        )}
      </div>
    </div>
  );
};