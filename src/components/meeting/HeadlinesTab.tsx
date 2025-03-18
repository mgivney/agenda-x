
import { Headline } from "@/store/meetingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface HeadlinesTabProps {
  headlines: Headline[];
  onAddHeadline?: () => void;
}

const HeadlinesTab = ({ headlines, onAddHeadline }: HeadlinesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Headlines</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onAddHeadline}
        >
          <Plus size={16} /> Add Headline
        </Button>
      </div>
      
      {headlines.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-eos-gray">No headlines for this meeting.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {headlines.map(headline => (
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
    </div>
  );
};

export default HeadlinesTab;
