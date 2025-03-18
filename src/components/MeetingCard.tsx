
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meeting } from "@/store/meetingContext";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface MeetingCardProps {
  meeting: Meeting;
}

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <Link to={`/meeting/${meeting.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="bg-eos-blue text-white py-3 px-4">
          <h3 className="font-semibold text-lg">{meeting.name}</h3>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center text-eos-gray">
              <Calendar size={16} className="mr-2" />
              <span>{meeting.dayOfWeek}</span>
            </div>
            <div className="flex items-center text-eos-gray">
              <Clock size={16} className="mr-2" />
              <span>{meeting.time} ({meeting.duration})</span>
            </div>
            <div className="text-sm text-eos-gray mt-2 line-clamp-2">
              {meeting.description || "No description provided"}
            </div>
            <div className="flex mt-3">
              <div className="text-xs bg-eos-lightGray px-2 py-1 rounded-full text-eos-gray">
                {meeting.members.length} members
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MeetingCard;
