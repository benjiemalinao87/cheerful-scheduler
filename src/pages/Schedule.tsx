import { useState } from "react";
import { Calendar } from "@/components/scheduling/Calendar";
import { TimeSlots } from "@/components/scheduling/TimeSlots";
import { EventDetails } from "@/components/scheduling/EventDetails";
import { useToast } from "@/components/ui/use-toast";
import { BookingModal } from "@/components/scheduling/BookingModal";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsBookingModalOpen(true);
    toast({
      title: "Time slot selected",
      description: `You selected ${time}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
          <EventDetails />
          <div className="p-6">
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
            <div className="mt-6">
              <TimeSlots
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={handleTimeSelect}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedDate && selectedTime && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          date={selectedDate}
          time={selectedTime}
        />
      )}
    </div>
  );
};

export default Schedule;