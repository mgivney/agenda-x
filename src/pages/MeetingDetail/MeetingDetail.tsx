
import { useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SegueTab from "@/components/meeting/SegueTab";
import RocksTab from "@/components/meeting/RocksTab";
import HeadlinesTab from "@/components/meeting/HeadlinesTab";
import TodosTab from "@/components/meeting/TodosTab";
import IssuesTab from "@/components/meeting/IssuesTab";
import ConclusionTab from "@/components/meeting/ConclusionTab";
import MeetingHeader from "./MeetingHeader";
import { useMeetingDetail } from "./useMeetingDetail";

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tabsRef = useRef<HTMLDivElement>(null);
  const {
    meeting,
    conclusion,
    memberRatings,
    activeTab,
    setActiveTab,
    handleConclusionChange,
    saveConclusion,
    handleRatingChange,
    handleTodoStatusChange,
    handleRockStatusChange,
    handleReorderIssues,
    handleAddTodo,
    handleAddHeadline,
    handleAddIssue,
    handleStartMeeting
  } = useMeetingDetail(id);

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
      <Header title={meeting.name || ""} showBackButton />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <MeetingHeader meeting={meeting} />
        
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
