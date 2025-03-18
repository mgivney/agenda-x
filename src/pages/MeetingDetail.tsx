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
  useMeetingContext
} from "@/store/meetingContext";
import { CheckCircle, ChevronDown, ChevronUp, Circle, Clock, GripVertical, MessageSquare, Plus, Star, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SortableIssueItem = ({ issue, index }: { issue: any, index: number }) => {
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
                  onClick={() => setIsExpanded(!isExpanded)}
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
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
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

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    meetings, 
    updateMeetingConclusion,
    updateRockStatus,
    updateTodoStatus,
    updateMemberRating,
    reorderIssues
  } = useMeetingContext();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [conclusion, setConclusion] = useState("");
  const [memberRatings, setMemberRatings] = useState<Record<string, number>>({});
  const { toast } = useToast();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const calculateAverageRating = (): number => {
    if (!meeting || Object.keys(memberRatings).length === 0) return 0;
    
    const sum = Object.values(memberRatings).reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / Object.values(memberRatings).length).toFixed(1));
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && meeting) {
      const oldIndex = meeting.issues.findIndex(issue => issue.id === active.id);
      const newIndex = meeting.issues.findIndex(issue => issue.id === over.id);
      
      if (id) {
        reorderIssues(id, oldIndex, newIndex);
        toast({
          title: "Success",
          description: "Issues reordered successfully.",
        });
      }
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
      <Header title={meeting?.name || ""} showBackButton />
      
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-eos-blue">{meeting?.name}</h2>
              <p className="text-eos-gray">{meeting?.description || "No description provided"}</p>
            </div>
            <div className="flex items-center text-eos-gray">
              <Clock size={16} className="mr-2" />
              <span>{meeting?.dayOfWeek} at {meeting?.time} ({meeting?.duration})</span>
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
              <div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={meeting.issues.map(issue => issue.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {meeting.issues.map((issue, index) => (
                      <SortableIssueItem key={issue.id} issue={issue} index={index} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="conclusion">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {meeting?.members.map(member => (
                    <div key={member} className="flex items-center gap-4">
                      <div className="w-1/3 font-medium">{member}</div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRatingChange(member, (memberRatings[member] || 5) - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{memberRatings[member] || 5}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRatingChange(member, (memberRatings[member] || 5) + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center">
                        {[...Array(memberRatings[member] || 0)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Average Rating:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">{calculateAverageRating()}</span>
                      <div className="flex items-center">
                        {[...Array(Math.round(calculateAverageRating()))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Cascading Messaging</h3>
                  <Textarea
                    placeholder="Enter meeting conclusion and key takeaways..."
                    className="min-h-[100px]"
                    value={conclusion}
                    onChange={handleConclusionChange}
                  />
                  <div className="flex justify-end mt-2">
                    <Button onClick={saveConclusion}>Save Notes</Button>
                  </div>
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
