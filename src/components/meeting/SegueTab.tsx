
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface SegueTabProps {
  members: string[];
  onStartMeeting: () => void;
}

const SegueTab = ({ members, onStartMeeting }: SegueTabProps) => {
  const [attendees, setAttendees] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  const handleAttendeeChange = (member: string, checked: boolean) => {
    setAttendees(prev => ({
      ...prev,
      [member]: checked
    }));
  };
  
  const attendeeCount = Object.values(attendees).filter(Boolean).length;
  const canStartMeeting = attendeeCount >= 2;
  
  const handleStartMeeting = () => {
    toast({
      title: "Meeting Started",
      description: `Starting meeting with ${attendeeCount} attendees.`
    });
    onStartMeeting();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Meeting Check-in</h3>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            Check off at least two team members who are present to start the meeting.
          </p>
          
          <div className="space-y-3">
            {members.map(member => (
              <div key={member} className="flex items-center space-x-2">
                <Checkbox 
                  id={`member-${member}`}
                  checked={attendees[member] || false}
                  onCheckedChange={(checked) => handleAttendeeChange(member, checked === true)}
                />
                <label 
                  htmlFor={`member-${member}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {member}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              disabled={!canStartMeeting}
              onClick={handleStartMeeting}
              className="w-full max-w-xs"
            >
              Start Meeting ({attendeeCount}/2)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SegueTab;
