
import { useState, useEffect } from "react";
import { Meeting, useMeetingContext } from "@/store/meetingContext";
import { useToast } from "@/hooks/use-toast";

export const useMeetingDetail = (id: string | undefined) => {
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

  const handleAddIssue = (issueData: { description: string; details: string; category: string }) => {
    if (id && meeting) {
      const newIssue = {
        description: issueData.description,
        reporter: meeting.members[0],
        category: "", // Keeping empty string for category as we're removing it
        details: issueData.details,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addIssue(id, newIssue);
    }
  };

  const handleStartMeeting = () => {
    setActiveTab("rocks");
  };

  return {
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
  };
};
