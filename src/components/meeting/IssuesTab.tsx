
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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useToast } from "@/components/ui/use-toast";

interface IssuesTabProps {
  issues: Issue[];
  onAddIssue?: () => void;
  onReorderIssues: (oldIndex: number, newIndex: number) => void;
}

const IssuesTab = ({ issues, onAddIssue, onReorderIssues }: IssuesTabProps) => {
  const { toast } = useToast();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = issues.findIndex(issue => issue.id === active.id);
      const newIndex = issues.findIndex(issue => issue.id === over.id);
      
      onReorderIssues(oldIndex, newIndex);
      
      toast({
        title: "Success",
        description: "Issues reordered successfully.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Issues for IDS</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onAddIssue}
        >
          <Plus size={16} /> Add Issue
        </Button>
      </div>
      
      {issues.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-eos-gray">No issues for this meeting.</p>
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
              items={issues.map(issue => issue.id)}
              strategy={verticalListSortingStrategy}
            >
              {issues.map((issue, index) => (
                <SortableIssueItem key={issue.id} issue={issue} index={index} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default IssuesTab;
