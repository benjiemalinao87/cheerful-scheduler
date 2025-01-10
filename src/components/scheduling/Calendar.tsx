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
    <div className="p-6 flex-1">
      <div className="space-y-8">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Select Date & Time</h2>
        </div>

        <div className="bg-white rounded-lg">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6; // Disable weekends
            }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-100",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full",
              head_cell: "text-gray-500 rounded-md w-full font-normal text-[0.8rem] h-9",
              row: "flex w-full mt-2",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-gray-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              day: "h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-gray-50 rounded-md",
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-400 opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>

        {date && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Available Times</h3>
            <div className="grid grid-cols-3 gap-3">
              {AVAILABLE_TIMES.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  onClick={() => handleTimeSelect(time)}
                  className="w-full justify-center py-6 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
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