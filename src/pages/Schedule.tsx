import { Calendar } from "@/components/scheduling/Calendar";
import { EventDetails } from "@/components/scheduling/EventDetails";

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
          <EventDetails />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Schedule;