
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp, GripVertical, MessageSquare } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SortableIssueItemProps {
  issue: {
    id: string;
    description: string;
    reporter: string;
    category: string;
    details?: string;
    comments?: {
      id: string;
      user: string;
      text: string;
      timestamp: string;
    }[];
  };
  index: number;
}

const SortableIssueItem = ({ issue, index }: SortableIssueItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: issue.id });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState<{ id: string; user: string; text: string; timestamp: string }[]>(
    issue?.comments || []
  );
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      user: "You",
      text: newComment,
      timestamp: new Date().toLocaleString()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the discussion.",
    });
  };

  return (
    <div className="mb-4">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card ref={setNodeRef} style={style}>
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div 
                className="cursor-grab p-1 mt-1 text-gray-400 hover:text-gray-600 transition-colors"
                {...attributes}
                {...listeners}
              >
                <GripVertical size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{issue.description}</h4>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-eos-gray">Reported by: {issue.reporter}</p>
                  <CollapsibleTrigger 
                    className="flex items-center text-eos-blue text-sm hover:underline"
                  >
                    {isExpanded ? (
                      <>Less <ChevronUp size={14} className="ml-1" /></>
                    ) : (
                      <>More <ChevronDown size={14} className="ml-1" /></>
                    )}
                  </CollapsibleTrigger>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <CollapsibleContent className="mt-1 bg-gray-50 rounded-md p-4 border shadow-sm animate-accordion-down">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Issue Details:</h3>
              <div className="bg-white p-3 rounded-md border">
                <p className="text-sm">{issue?.details || "No additional details provided."}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Category: {issue?.category}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare size={16} />
                Comments
              </h3>
              
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-3 rounded-md border">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] bg-white"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={handleAddComment}>Add Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SortableIssueItem;
