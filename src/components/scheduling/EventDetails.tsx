import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, User } from "lucide-react";

export const EventDetails = () => {
  return (
    <div className="p-6 border-r border-gray-200">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Demo Meeting</h1>
          <p className="text-gray-600 mt-2">
            Book a 30-minute meeting to see our product in action and get your questions answered.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>30 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CalendarDays className="h-5 w-5" />
              <span>Monday - Friday</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <User className="h-5 w-5" />
              <span>1-on-1 Meeting</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};