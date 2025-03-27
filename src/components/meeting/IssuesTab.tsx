
import { Issue } from "@/store/meetingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import IssueItem from "./IssueItem";
import { useToast } from "@/components/ui/use-toast";

interface IssuesTabProps {
  issues: Issue[];
  meetingId: string;
  onAddIssue?: () => void;
  onReorderIssues: (oldIndex: number, newIndex: number) => void;
}

const IssuesTab = ({ issues, meetingId, onAddIssue }: IssuesTabProps) => {
  const { toast } = useToast();
  
  // Filter out resolved issues
  const activeIssues = issues.filter(issue => !issue.resolved);

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
          {activeIssues.map((issue, index) => (
            <IssueItem 
              key={issue.id} 
              issue={issue} 
              index={index} 
              meetingId={meetingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesTab;
