
import { Rock } from "@/store/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle, XCircle, Circle } from "lucide-react";

interface RocksTabProps {
  rocks: Rock[];
  onAddRock?: () => void;
  onRockStatusChange: (rockId: string, status: 'on-track' | 'off-track' | 'completed') => void;
}

const RocksTab = ({ rocks, onAddRock, onRockStatusChange }: RocksTabProps) => {
  // Get quarter number (Q1-Q4) based on a specific date
  const getQuarterFromDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth(); // 0-11
    return `Q${Math.floor(month / 3) + 1}`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Quarterly Rocks</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onAddRock}
        >
          <Plus size={16} /> Add Rock
        </Button>
      </div>
      
      {rocks.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-eos-gray">No rocks for this meeting.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rocks.map(rock => (
            <Card key={rock.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{rock.description}</h4>
                    <p className="text-sm text-eos-gray">{getQuarterFromDate(rock.createdAt)} rock for {rock.owner}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`rounded-full px-3 ${rock.status === 'on-track' ? 'bg-green-100 text-green-700' : ''}`}
                      onClick={() => onRockStatusChange(rock.id, 'on-track')}
                    >
                      <CheckCircle size={16} className="mr-1" /> On Track
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`rounded-full px-3 ${rock.status === 'off-track' ? 'bg-red-100 text-red-700' : ''}`}
                      onClick={() => onRockStatusChange(rock.id, 'off-track')}
                    >
                      <XCircle size={16} className="mr-1" /> Off Track
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`rounded-full px-3 ${rock.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}`}
                      onClick={() => onRockStatusChange(rock.id, 'completed')}
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
    </div>
  );
};

export default RocksTab;
