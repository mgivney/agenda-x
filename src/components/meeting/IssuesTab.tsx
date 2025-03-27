
import { Issue } from "@/store/meetingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import IssueItem from "./IssueItem";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface IssuesTabProps {
  issues: Issue[];
  meetingId: string;
  onAddIssue?: (issueData: { description: string; details: string; category: string }) => void;
  onReorderIssues: (oldIndex: number, newIndex: number) => void;
}

const IssuesTab = ({ issues, meetingId, onAddIssue, onReorderIssues }: IssuesTabProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueDetails, setNewIssueDetails] = useState("");
  
  // Filter out resolved issues
  const activeIssues = issues.filter(issue => !issue.resolved);

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    // Clear form fields
    setNewIssueTitle("");
    setNewIssueDetails("");
  };

  const handleCreateIssue = () => {
    if (onAddIssue) {
      onAddIssue({
        description: newIssueTitle,
        details: newIssueDetails,
        category: "" // Keeping empty string for compatibility with existing interface
      });
      
      toast({
        title: "Issue created",
        description: "The issue has been successfully added.",
      });
      
      handleCloseAddDialog();
    }
  };

  const isFormValid = newIssueTitle.trim() !== "" && newIssueDetails.trim() !== "";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Issues</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleOpenAddDialog}
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

      <Dialog 
        open={isAddDialogOpen} 
        onOpenChange={(open) => {
          // Only allow the dialog to be closed through button clicks or the close (x) button
          if (!open) {
            handleCloseAddDialog();
          }
        }}
      >
        <DialogContent 
          className="sm:max-w-md"
          onPointerDownOutside={(e) => {
            // Prevent closing when clicking outside
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            // Prevent closing when pressing escape
            e.preventDefault();
          }}
          onInteractOutside={(e) => {
            // Prevent any interactions outside the dialog from closing it
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add New Issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="issue-title">Issue Title <span className="text-red-500">*</span></Label>
              <Input
                id="issue-title"
                placeholder="Enter issue title"
                value={newIssueTitle}
                onChange={(e) => setNewIssueTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue-details">Issue Details <span className="text-red-500">*</span></Label>
              <Textarea
                id="issue-details"
                placeholder="Describe the issue in detail"
                className="min-h-[100px]"
                value={newIssueDetails}
                onChange={(e) => setNewIssueDetails(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCloseAddDialog}>Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleCreateIssue} 
              disabled={!isFormValid}
            >
              Create Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssuesTab;

