
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ConclusionTabProps {
  members: string[];
  memberRatings: Record<string, number>;
  conclusion: string;
  onMemberRatingChange: (member: string, rating: number) => void;
  onConclusionChange: (value: string) => void;
  onSaveConclusion: () => void;
}

const ConclusionTab = ({
  members,
  memberRatings,
  conclusion,
  onMemberRatingChange,
  onConclusionChange,
  onSaveConclusion
}: ConclusionTabProps) => {
  const calculateAverageRating = (): number => {
    if (!members || Object.keys(memberRatings).length === 0) return 0;
    
    const sum = Object.values(memberRatings).reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / Object.values(memberRatings).length).toFixed(1));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {members.map(member => (
            <div key={member} className="flex items-center gap-4">
              <div className="w-1/3 font-medium">{member}</div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onMemberRatingChange(member, (memberRatings[member] || 5) - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{memberRatings[member] || 5}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onMemberRatingChange(member, (memberRatings[member] || 5) + 1)}
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
            onChange={(e) => onConclusionChange(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button onClick={onSaveConclusion}>Save Notes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConclusionTab;
