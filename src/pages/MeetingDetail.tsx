
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Meeting, 
  meetingStore, 
  updateMeetingConclusion, 
  updateRockStatus,
  updateTodoStatus
} from "@/store/meetingStore";
import { CheckCircle, Circle, Clock, Plus, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "react-simple-store";
import { useParams } from "react-router-dom";

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { meetings } = useStore(meetingStore);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [conclusion, setConclusion] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundMeeting = meetings.find(m => m.id === id);
      if (foundMeeting) {
        setMeeting(foundMeeting);
        setConclusion(foundMeeting.conclusion);
      }
    }
  }, [id, meetings]);

  const handleConclusionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConclusion(e.target.value);
  };

  const saveConclusion = () => {
    if (id) {
      updateMeetingConclusion(id, conclusion);
      toast({
        title: "Success",
        description: "Meeting conclusion has been saved.",
      });
    }
  };

  const handleTodoStatusChange = (todoId: string, checked: boolean) => {
    if (id) {
      updateTodoStatus(id, todoId, checked);
    }
  };

  const handleRockStatusChange = (rockId: string, status: 'on-track' | 'off-track' | 'completed') => {
    if (id) {
      updateRockStatus(id, rockId, status);
    }
  };

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Meeting Details" showBackButton />
        <div className="container max-w-4xl mx-auto py-10 px-4 text-center">
          <p>Meeting not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={meeting.name} showBackButton />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-eos-blue">{meeting.name}</h2>
              <p className="text-eos-gray">{meeting.description || "No description provided"}</p>
            </div>
            <div className="flex items-center text-eos-gray">
              <Clock size={16} className="mr-2" />
              <span>{meeting.dayOfWeek} at {meeting.time} ({meeting.duration})</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="rocks" className="animate-fade-in">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="rocks">Rocks</TabsTrigger>
            <TabsTrigger value="headlines">Headlines</TabsTrigger>
            <TabsTrigger value="todos">To-Dos</TabsTrigger>
            <TabsTrigger value="issues">IDS</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rocks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Quarterly Rocks</h3>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus size={16} /> Add Rock
              </Button>
            </div>
            
            {meeting.rocks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <p className="text-eos-gray">No rocks for this meeting.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {meeting.rocks.map(rock => (
                  <Card key={rock.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{rock.description}</h4>
                          <p className="text-sm text-eos-gray">Owner: {rock.owner}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className={`rounded-full px-3 ${rock.status === 'on-track' ? 'bg-green-100 text-green-700' : ''}`}
                            onClick={() => handleRockStatusChange(rock.id, 'on-track')}
                          >
                            <CheckCircle size={16} className="mr-1" /> On Track
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className={`rounded-full px-3 ${rock.status === 'off-track' ? 'bg-red-100 text-red-700' : ''}`}
                            onClick={() => handleRockStatusChange(rock.id, 'off-track')}
                          >
                            <XCircle size={16} className="mr-1" /> Off Track
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className={`rounded-full px-3 ${rock.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}`}
                            onClick={() => handleRockStatusChange(rock.id, 'completed')}
                          >
                            <Circle size={16} className="mr-1" /> Done
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="headlines" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Headlines</h3>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus size={16} /> Add Headline
              </Button>
            </div>
            
            {meeting.headlines.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <p className="text-eos-gray">No headlines for this meeting.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {meeting.headlines.map(headline => (
                  <Card key={headline.id}>
                    <CardContent className="p-4">
                      <div>
                        <h4 className="font-medium">{headline.content}</h4>
                        <p className="text-sm text-eos-gray">Reported by: {headline.reporter}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="todos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">To-Dos</h3>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus size={16} /> Add To-Do
              </Button>
            </div>
            
            {meeting.todos.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <p className="text-eos-gray">No to-dos for this meeting.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {meeting.todos.map(todo => (
                  <Card key={todo.id} className={todo.completed ? "bg-gray-50" : ""}>
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-start">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={(checked) => 
                            handleTodoStatusChange(todo.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${todo.completed ? "line-through text-eos-gray" : ""}`}>
                            {todo.description}
                          </h4>
                          <p className="text-sm text-eos-gray">Assigned to: {todo.assignee}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="issues" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Issues for IDS</h3>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus size={16} /> Add Issue
              </Button>
            </div>
            
            {meeting.issues.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <p className="text-eos-gray">No issues for this meeting.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {meeting.issues.map(issue => (
                  <Card key={issue.id}>
                    <CardContent className="p-4">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium">{issue.description}</h4>
                          <span className="text-xs bg-eos-lightGray px-2 py-1 rounded-full text-eos-gray">
                            {issue.category}
                          </span>
                        </div>
                        <p className="text-sm text-eos-gray">Reported by: {issue.reporter}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="conclusion">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Conclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter meeting conclusion and key takeaways..."
                  className="min-h-[200px]"
                  value={conclusion}
                  onChange={handleConclusionChange}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveConclusion}>Save Conclusion</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MeetingDetail;
