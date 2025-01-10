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
    <div className="p-6 bg-white">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Select Date & Time</h2>
        </div>

        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => {
            const day = date.getDay();
            return day === 0 || day === 6; // Disable weekends
          }}
        />

        {date && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Available Times</h3>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TIMES.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  onClick={() => handleTimeSelect(time)}
                  className="justify-start"
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