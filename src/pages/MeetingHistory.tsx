
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { useMeetingContext, Meeting, Todo, Rock, Issue } from "@/store/meetingContext";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Circle, CheckCircle2 } from "lucide-react";

interface HistoryItem {
  id: string;
  type: 'rock' | 'todo' | 'issue' | 'message';
  description: string;
  date: string;
  owner?: string;
  category?: string;
}

interface GroupedHistoryItems {
  [date: string]: HistoryItem[];
}

const MeetingHistory = () => {
  const { id } = useParams<{ id: string }>();
  const { meetings } = useMeetingContext();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [historyItems, setHistoryItems] = useState<GroupedHistoryItems>({});

  useEffect(() => {
    if (id) {
      const foundMeeting = meetings.find(m => m.id === id);
      if (foundMeeting) {
        setMeeting(foundMeeting);
        
        // Create history items from completed todos, completed rocks, and resolved issues
        const items: HistoryItem[] = [];
        
        // Add todos
        foundMeeting.todos
          .filter(todo => todo.completed)
          .forEach(todo => {
            items.push({
              id: todo.id,
              type: 'todo',
              description: todo.description,
              date: new Date(todo.createdAt).toISOString().split('T')[0],
              owner: todo.assignee
            });
          });
        
        // Add rocks
        foundMeeting.rocks
          .filter(rock => rock.status === 'completed')
          .forEach(rock => {
            items.push({
              id: rock.id,
              type: 'rock',
              description: rock.description,
              date: new Date(rock.createdAt).toISOString().split('T')[0],
              owner: rock.owner
            });
          });
        
        // Add issues
        foundMeeting.issues
          .filter(issue => issue.resolved)
          .forEach(issue => {
            items.push({
              id: issue.id,
              type: 'issue',
              description: issue.description,
              date: issue.resolvedAt ? new Date(issue.resolvedAt).toISOString().split('T')[0] : 
                     new Date(issue.createdAt).toISOString().split('T')[0],
              owner: issue.reporter,
              category: issue.category
            });
          });
        
        // Group by date
        const grouped = items.reduce((acc: GroupedHistoryItems, item) => {
          if (!acc[item.date]) {
            acc[item.date] = [];
          }
          acc[item.date].push(item);
          return acc;
        }, {});
        
        // Sort dates in descending order
        const sortedGrouped: GroupedHistoryItems = {};
        Object.keys(grouped)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .forEach(date => {
            sortedGrouped[date] = grouped[date];
          });
        
        setHistoryItems(sortedGrouped);
      }
    }
  }, [id, meetings]);

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Meeting History" showBackButton />
        <div className="container max-w-4xl mx-auto py-10 px-4 text-center">
          <p>Meeting not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`${meeting.name} - History`} showBackButton />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-eos-blue">Completed Items History</h2>
          <Link 
            to={`/meeting/${id}`}
            className="flex items-center text-sm text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Meeting
          </Link>
        </div>
        
        {Object.keys(historyItems).length === 0 ? (
          <Card>
            <CardContent className="text-center py-10">
              <p className="text-eos-gray">No completed items found for this meeting.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(historyItems).map(([date, items]) => (
            <Card key={date} className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle className="text-lg">
                    {format(new Date(date), 'PPP')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="border-l-2 border-blue-100 pl-4 py-1">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        <div className="flex-grow">
                          <p className="font-medium">{item.description}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span>Assigned to: {item.owner}</span>
                            <Circle className="h-1 w-1 mx-2 text-gray-300" />
                            <Badge variant="outline" className="text-xs">
                              {item.type === 'rock' ? 'Rock' : 
                               item.type === 'todo' ? 'To-Do' : 
                               'Issue'}
                            </Badge>
                            {item.category && (
                              <>
                                <Circle className="h-1 w-1 mx-2 text-gray-300" />
                                <span>Category: {item.category}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingHistory;
