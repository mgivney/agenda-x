
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { Meeting } from "@/store/meetingContext";

interface MeetingHeaderProps {
  meeting: Meeting;
}

const MeetingHeader = ({ meeting }: MeetingHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-eos-blue">{meeting.name}</h2>
          <p className="text-eos-gray">{meeting.description || "No description provided"}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-eos-gray mb-2">
            <span>{meeting.dayOfWeek} at {meeting.time} ({meeting.duration})</span>
          </div>
          <Link 
            to={`/meeting/${meeting.id}/history`} 
            className="flex items-center text-sm text-blue-500 hover:text-blue-700"
          >
            <History className="h-4 w-4 mr-1" />
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingHeader;
