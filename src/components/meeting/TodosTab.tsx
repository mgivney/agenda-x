
import { Todo } from "@/store/meetingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

interface TodosTabProps {
  todos: Todo[];
  onAddTodo?: () => void;
  onTodoStatusChange: (todoId: string, completed: boolean) => void;
}

const TodosTab = ({ todos, onAddTodo, onTodoStatusChange }: TodosTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">To-Dos</h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onAddTodo}
        >
          <Plus size={16} /> Add To-Do
        </Button>
      </div>
      
      {todos.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-eos-gray">No to-dos for this meeting.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <Card key={todo.id} className={todo.completed ? "bg-gray-50" : ""}>
              <CardContent className="p-4">
                <div className="flex gap-3 items-start">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => 
                      onTodoStatusChange(todo.id, checked as boolean)
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
    </div>
  );
};

export default TodosTab;
