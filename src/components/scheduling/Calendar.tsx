import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handlePreviousMonth}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </Button>
        <span className="text-lg font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <Button
          variant="ghost"
          onClick={handleNextMonth}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day} className="text-sm font-medium text-gray-600">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <Button
            key={day.toISOString()}
            onClick={() => onSelectDate(day)}
            variant="outline"
            className={`h-10 ${
              isSameDay(day, selectedDate || new Date())
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-background hover:bg-accent"
            } ${
              isToday(day)
                ? "border-primary"
                : "border-border"
            }`}
          >
            {format(day, "d")}
          </Button>
        ))}
      </div>
    </div>
  );
}