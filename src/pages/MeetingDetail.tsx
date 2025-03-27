
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Meeting, useMeetingContext } from "@/store/meetingContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import SegueTab from "@/components/meeting/SegueTab";
import RocksTab from "@/components/meeting/RocksTab";
import HeadlinesTab from "@/components/meeting/HeadlinesTab";
import TodosTab from "@/components/meeting/TodosTab";
import IssuesTab from "@/components/meeting/IssuesTab";
import ConclusionTab from "@/components/meeting/ConclusionTab";
import { History } from "lucide-react";

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    meetings, 
    updateMeetingConclusion,
    updateRockStatus,
    updateTodoStatus,
    updateMemberRating,
    reorderIssues,
    addTodo,
    addHeadline,
    addIssue
  } = useMeetingContext();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [conclusion, setConclusion] = useState("");
  const [memberRatings, setMemberRatings] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState("segue");
  const { toast } = useToast();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const foundMeeting = meetings.find(m => m.id === id);
      if (foundMeeting) {
        setMeeting(foundMeeting);
        setConclusion(foundMeeting.conclusion);
        
        const initialRatings: Record<string, number> = {};
        foundMeeting.members.forEach(member => {
          initialRatings[member] = foundMeeting.memberRatings?.[member] || 5;
        });
        setMemberRatings(initialRatings);
      }
    }
  }, [id, meetings]);

  const handleConclusionChange = (value: string) => {
    setConclusion(value);
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

  const handleRatingChange = (member: string, newRating: number) => {
    if (newRating < 1) newRating = 1;
    if (newRating > 10) newRating = 10;
    
    setMemberRatings(prev => ({
      ...prev,
      [member]: newRating
    }));
    
    if (id) {
      updateMemberRating(id, member, newRating);
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

  const handleReorderIssues = (oldIndex: number, newIndex: number) => {
    if (id) {
      reorderIssues(id, oldIndex, newIndex);
    }
  };

  const handleAddTodo = () => {
    if (id && meeting) {
      const newTodo = {
        description: "New to-do item",
        assignee: meeting.members[0],
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addTodo(id, newTodo);
    }
  };

  const handleAddHeadline = () => {
    if (id && meeting) {
      const newHeadline = {
        content: "New headline",
        reporter: meeting.members[0],
        createdAt: new Date().toISOString().split('T')[0]
      };
      addHeadline(id, newHeadline);
    }
  };

  const handleAddIssue = () => {
    if (id && meeting) {
      const newIssue = {
        description: "New issue",
        reporter: meeting.members[0],
        category: "General",
        createdAt: new Date().toISOString().split('T')[0]
      };
      addIssue(id, newIssue);
    }
  };

  const handleStartMeeting = () => {
    setActiveTab("rocks");
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
      <Header title={meeting?.name || ""} showBackButton />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-eos-blue">{meeting?.name}</h2>
              <p className="text-eos-gray">{meeting?.description || "No description provided"}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-eos-gray mb-2">
                <span>{meeting?.dayOfWeek} at {meeting?.time} ({meeting?.duration})</span>
              </div>
              <Link 
                to={`/meeting/${id}/history`} 
                className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              >
                <History className="h-4 w-4 mr-1" />
                View History
              </Link>
            </div>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="animate-fade-in"
          ref={tabsRef}
        >
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="segue">Segue</TabsTrigger>
            <TabsTrigger value="rocks">Rocks</TabsTrigger>
            <TabsTrigger value="headlines">Headlines</TabsTrigger>
            <TabsTrigger value="todos">To-Dos</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="segue">
            <SegueTab 
              members={meeting.members}
              onStartMeeting={handleStartMeeting}
            />
          </TabsContent>
          
          <TabsContent value="rocks">
            <RocksTab 
              rocks={meeting.rocks} 
              onRockStatusChange={handleRockStatusChange}
              onAddRock={() => {}} 
            />
          </TabsContent>
          
          <TabsContent value="headlines">
            <HeadlinesTab 
              headlines={meeting.headlines}
              onAddHeadline={handleAddHeadline} 
            />
          </TabsContent>
          
          <TabsContent value="todos">
            <TodosTab 
              todos={meeting.todos} 
              onTodoStatusChange={handleTodoStatusChange}
              onAddTodo={handleAddTodo}
            />
          </TabsContent>
          
          <TabsContent value="issues">
            <IssuesTab 
              issues={meeting.issues}
              meetingId={id || ""}
              onReorderIssues={handleReorderIssues}
              onAddIssue={handleAddIssue}
            />
          </TabsContent>
          
          <TabsContent value="conclusion">
            <ConclusionTab 
              members={meeting.members}
              memberRatings={memberRatings}
              conclusion={conclusion}
              onMemberRatingChange={handleRatingChange}
              onConclusionChange={handleConclusionChange}
              onSaveConclusion={saveConclusion}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MeetingDetail;
