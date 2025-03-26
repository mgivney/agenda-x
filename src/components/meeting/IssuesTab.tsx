
import { Issue } from "@/store/meetingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import SortableIssueItem from "./SortableIssueItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useToast } from "@/components/ui/use-toast";

interface IssuesTabProps {
  issues: Issue[];
  meetingId: string;
  onAddIssue?: () => void;
  onReorderIssues: (oldIndex: number, newIndex: number) => void;
}

const IssuesTab = ({ issues, meetingId, onAddIssue, onReorderIssues }: IssuesTabProps) => {
  const { toast } = useToast();
  
  // Filter out resolved issues
  const activeIssues = issues.filter(issue => !issue.resolved);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Decrease the activation constraint to make dragging more responsive
      activationConstraint: {
        distance: 2, // Further reduced for easier activation
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = activeIssues.findIndex(issue => issue.id === active.id);
      const newIndex = activeIssues.findIndex(issue => issue.id === over.id);
      
      // Only proceed if both indices are valid
      if (oldIndex !== -1 && newIndex !== -1) {
        // Directly call the parent handler
        onReorderIssues(oldIndex, newIndex);
        
        toast({
          title: "Success",
          description: "Issues reordered successfully.",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Issues</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onAddIssue}
        >
          <Plus size={16} /> Add Issue
        </Button>
      </div>
      
      {activeIssues.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-eos-gray">No active issues for this meeting.</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeIssues.map(issue => issue.id)}
              strategy={verticalListSortingStrategy}
            >
              {activeIssues.map((issue, index) => (
                <SortableIssueItem 
                  key={issue.id} 
                  issue={issue} 
                  index={index} 
                  meetingId={meetingId}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default IssuesTab;
