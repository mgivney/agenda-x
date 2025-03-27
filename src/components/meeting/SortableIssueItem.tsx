import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp, GripVertical, Check, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMeetingContext } from "@/store/meetingContext";
import { format } from 'date-fns';

interface SortableIssueItemProps {
  issue: {
    id: string;
    description: string;
    reporter: string;
    category: string;
    details?: string;
    createdAt: string;
    resolved?: boolean;
    resolution?: string;
    resolvedAt?: string;
  };
  index: number;
  meetingId: string;
}

const SortableIssueItem = ({ issue, index, meetingId }: SortableIssueItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: issue.id });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [resolution, setResolution] = useState("");
  const { toast } = useToast();
  const { resolveIssue } = useMeetingContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const handleResolveIssue = () => {
    if (!resolution.trim()) {
      toast({
        title: "Resolution required",
        description: "Please provide a resolution before resolving the issue.",
        variant: "destructive"
      });
      return;
    }
    
    resolveIssue(meetingId, issue.id, resolution);
    
    toast({
      title: "Issue resolved",
      description: "The issue has been successfully resolved.",
    });
  };

  const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

  return (
    <div className="mb-4">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card ref={setNodeRef} style={style} className="relative">
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
                  <div className="text-sm text-eos-gray">
                    <div>Reported by: {issue.reporter}</div>
                    <div>Reported on: {format(new Date(issue.createdAt), 'MMM d, yyyy')}</div>
                    {issue.resolved && issue.resolvedAt && (
                      <div className="flex items-center text-green-600 mt-1 text-xs">
                        <Check size={14} className="mr-1" />
                        <span>Resolved: {issue.resolvedAt}</span>
                      </div>
                    )}
                  </div>
                  {!issue.resolved && (
                    <CollapsibleTrigger 
                      className="flex items-center text-eos-blue text-sm hover:underline"
                    >
                      {isExpanded ? (
                        <>Less <ChevronUp size={14} className="ml-1" /></>
                      ) : (
                        <>More <ChevronDown size={14} className="ml-1" /></>
                      )}
                    </CollapsibleTrigger>
                  )}
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
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{loremIpsumText}</p>
                </div>
              </div>
            </div>
            
            {issue.resolved && issue.resolution ? (
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Resolution
                </h3>
                <div className="bg-white p-3 rounded-md border">
                  <p className="text-sm">{issue.resolution}</p>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center">
                    <Clock size={14} className="mr-1" />
                    {issue.resolvedAt}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Check size={16} />
                  Resolution
                </h3>
                <Textarea
                  placeholder="Enter resolution details..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="min-h-[80px] bg-white mb-2"
                />
                <div className="flex justify-end">
                  <Button onClick={handleResolveIssue}>Resolve Issue</Button>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SortableIssueItem;
