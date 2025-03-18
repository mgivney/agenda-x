
import Header from "@/components/Header";
import MeetingCard from "@/components/MeetingCard";
import { Meeting, meetingStore } from "@/store/meetingStore";
import { useStore } from "react-simple-store";

const MeetingList = () => {
  const { meetings, currentUser } = useStore(meetingStore);
  
  // Filter meetings where the current user is a member
  const userMeetings = meetings.filter(meeting => 
    meeting.members.includes(currentUser.name)
  );

  // Group meetings by day of week
  const meetingsByDay: Record<string, Meeting[]> = userMeetings.reduce((acc, meeting) => {
    if (!acc[meeting.dayOfWeek]) {
      acc[meeting.dayOfWeek] = [];
    }
    acc[meeting.dayOfWeek].push(meeting);
    return acc;
  }, {} as Record<string, Meeting[]>);

  // Order of days
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Sort the days
  const sortedDays = Object.keys(meetingsByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My L10 Meetings" />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold text-eos-blue mb-6">Your EOS Level 10 Meetings</h2>
        
        {userMeetings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-eos-gray">You don't have any meetings yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDays.map(day => (
              <div key={day} className="animate-fade-in">
                <h3 className="text-lg font-medium text-eos-gray mb-3">{day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meetingsByDay[day].map(meeting => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingList;
