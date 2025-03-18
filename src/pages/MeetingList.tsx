
import Header from "@/components/Header";
import MeetingCard from "@/components/MeetingCard";
import { Meeting, useMeetingContext } from "@/store/meetingContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MeetingList = () => {
  const { meetings, currentUser } = useMeetingContext();
  
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

  // Collect personal items from all meetings
  const personalRocks = meetings.flatMap(meeting => 
    meeting.rocks.filter(rock => rock.owner === currentUser.name)
      .map(rock => ({ ...rock, meetingId: meeting.id, meetingName: meeting.name }))
  );
  
  const personalTodos = meetings.flatMap(meeting => 
    meeting.todos.filter(todo => todo.assignee === currentUser.name)
      .map(todo => ({ ...todo, meetingId: meeting.id, meetingName: meeting.name }))
  );
  
  const personalHeadlines = meetings.flatMap(meeting => 
    meeting.headlines.filter(headline => headline.reporter === currentUser.name)
      .map(headline => ({ ...headline, meetingId: meeting.id, meetingName: meeting.name }))
  );
  
  const personalIssues = meetings.flatMap(meeting => 
    meeting.issues.filter(issue => issue.reporter === currentUser.name)
      .map(issue => ({ ...issue, meetingId: meeting.id, meetingName: meeting.name }))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My L10 Meetings" />
      
      <div className="container max-w-6xl mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* My Items Section */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-eos-blue mb-6">My Items</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Rocks */}
              <Card>
                <CardHeader className="bg-eos-blue text-white py-3 px-4">
                  <h3 className="font-semibold text-lg">My Rocks</h3>
                </CardHeader>
                <CardContent className="p-4">
                  {personalRocks.length === 0 ? (
                    <p className="text-eos-gray text-sm py-2">No rocks assigned to you</p>
                  ) : (
                    <ul className="space-y-3">
                      {personalRocks.map(rock => (
                        <li key={rock.id} className="flex items-start">
                          <span className={`inline-block mr-2 mt-1 rounded-full p-1 ${
                            rock.status === 'on-track' ? 'bg-green-100 text-green-600' : 
                            rock.status === 'off-track' ? 'bg-red-100 text-red-600' : 
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {rock.status === 'on-track' ? <Clock size={14} /> : 
                             rock.status === 'off-track' ? <AlertCircle size={14} /> : 
                             <Check size={14} />}
                          </span>
                          <div>
                            <Link to={`/meeting/${rock.meetingId}`} className="font-medium hover:text-eos-blue">
                              {rock.description}
                            </Link>
                            <p className="text-xs text-eos-gray">{rock.meetingName}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              
              {/* Todos */}
              <Card>
                <CardHeader className="bg-eos-blue text-white py-3 px-4">
                  <h3 className="font-semibold text-lg">My To-Dos</h3>
                </CardHeader>
                <CardContent className="p-4">
                  {personalTodos.length === 0 ? (
                    <p className="text-eos-gray text-sm py-2">No to-dos assigned to you</p>
                  ) : (
                    <ul className="space-y-3">
                      {personalTodos.map(todo => (
                        <li key={todo.id} className="flex items-start">
                          <span className={`inline-block mr-2 mt-1 rounded-full p-1 ${
                            todo.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {todo.completed ? <Check size={14} /> : <Clock size={14} />}
                          </span>
                          <div>
                            <Link to={`/meeting/${todo.meetingId}`} className="font-medium hover:text-eos-blue">
                              {todo.description}
                            </Link>
                            <p className="text-xs text-eos-gray">{todo.meetingName}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              
              {/* Headlines */}
              <Card>
                <CardHeader className="bg-eos-blue text-white py-3 px-4">
                  <h3 className="font-semibold text-lg">My Headlines</h3>
                </CardHeader>
                <CardContent className="p-4">
                  {personalHeadlines.length === 0 ? (
                    <p className="text-eos-gray text-sm py-2">No headlines reported by you</p>
                  ) : (
                    <ul className="space-y-3">
                      {personalHeadlines.map(headline => (
                        <li key={headline.id}>
                          <Link to={`/meeting/${headline.meetingId}`} className="font-medium hover:text-eos-blue">
                            {headline.content}
                          </Link>
                          <p className="text-xs text-eos-gray">{headline.meetingName}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              
              {/* Issues */}
              <Card>
                <CardHeader className="bg-eos-blue text-white py-3 px-4">
                  <h3 className="font-semibold text-lg">My Issues</h3>
                </CardHeader>
                <CardContent className="p-4">
                  {personalIssues.length === 0 ? (
                    <p className="text-eos-gray text-sm py-2">No issues reported by you</p>
                  ) : (
                    <ul className="space-y-3">
                      {personalIssues.map(issue => (
                        <li key={issue.id}>
                          <Link to={`/meeting/${issue.meetingId}`} className="font-medium hover:text-eos-blue">
                            {issue.description}
                          </Link>
                          <p className="text-xs text-eos-gray">{issue.meetingName} • {issue.category}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Meetings Section */}
          <div className="lg:w-1/2">
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
                    <div className="grid grid-cols-1 gap-4">
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
      </div>
    </div>
  );
};

export default MeetingList;
