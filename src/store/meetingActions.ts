
import { Meeting, Todo, Headline, Issue, Rock } from './types';

export const createMeetingActions = (
  meetings: Meeting[], 
  setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>
) => {
  const updateMeetingConclusion = (meetingId: string, conclusion: string) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? { ...meeting, conclusion } : meeting
    ));
  };

  const addTodo = (meetingId: string, todo: Omit<Todo, 'id'>) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            todos: [...meeting.todos, { ...todo, id: `todo-${Date.now()}` }] 
          } 
        : meeting
    ));
  };

  const updateTodoStatus = (meetingId: string, todoId: string, completed: boolean) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            todos: meeting.todos.map(todo => 
              todo.id === todoId ? { ...todo, completed } : todo
            ) 
          } 
        : meeting
    ));
  };

  const updateRockStatus = (meetingId: string, rockId: string, status: Rock['status']) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            rocks: meeting.rocks.map(rock => 
              rock.id === rockId ? { ...rock, status } : rock
            ) 
          } 
        : meeting
    ));
  };

  const addIssue = (meetingId: string, issue: Omit<Issue, 'id'>) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            issues: [...meeting.issues, { ...issue, id: `issue-${Date.now()}` }] 
          } 
        : meeting
    ));
  };

  const addHeadline = (meetingId: string, headline: Omit<Headline, 'id'>) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            headlines: [...meeting.headlines, { ...headline, id: `headline-${Date.now()}` }] 
          } 
        : meeting
    ));
  };

  const updateMemberRating = (meetingId: string, member: string, rating: number) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            memberRatings: {
              ...(meeting.memberRatings || {}),
              [member]: rating
            }
          } 
        : meeting
    ));
  };

  const sendMessage = (meetingId: string, content: string) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { 
            ...meeting, 
            messages: [
              ...(meeting.messages || []),
              { content, timestamp: new Date().toISOString() }
            ]
          } 
        : meeting
    ));
  };

  const reorderIssues = (meetingId: string, oldIndex: number, newIndex: number) => {
    setMeetings(meetings.map(meeting => {
      if (meeting.id === meetingId) {
        const newIssues = [...meeting.issues];
        const [movedIssue] = newIssues.splice(oldIndex, 1);
        newIssues.splice(newIndex, 0, movedIssue);
        
        return {
          ...meeting,
          issues: newIssues
        };
      }
      return meeting;
    }));
  };

  const resolveIssue = (meetingId: string, issueId: string, resolution: string) => {
    setMeetings(meetings.map(meeting => {
      if (meeting.id === meetingId) {
        const updatedIssues = meeting.issues.map(issue => {
          if (issue.id === issueId) {
            return {
              ...issue,
              resolved: true,
              resolution,
              resolvedAt: new Date().toLocaleString()
            };
          }
          return issue;
        });
        
        return {
          ...meeting,
          issues: updatedIssues
        };
      }
      return meeting;
    }));
  };

  return {
    updateMeetingConclusion,
    addTodo,
    updateTodoStatus,
    updateRockStatus,
    addIssue,
    addHeadline,
    updateMemberRating,
    sendMessage,
    reorderIssues,
    resolveIssue
  };
};
