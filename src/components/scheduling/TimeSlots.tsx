import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface TimeSlotsProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlots({ selectedDate, selectedTime, onSelectTime }: TimeSlotsProps) {
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  if (!selectedDate) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please select a date to view available time slots
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Available Times for {format(selectedDate, "MMMM d, yyyy")}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            onClick={() => onSelectTime(time)}
            className="h-10"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}