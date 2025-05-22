
export interface Todo {
  id: string;
  description: string;
  assignee: string;
  completed: boolean;
  createdAt: string;
}

export interface Headline {
  id: string;
  content: string;
  reporter: string;
  createdAt: string;
}

export interface Rock {
  id: string;
  description: string;
  owner: string;
  status: 'on-track' | 'off-track' | 'completed';
  createdAt: string;
}

export interface Issue {
  id: string;
  description: string;
  reporter: string;
  category: string;
  details?: string;
  createdAt: string;
  resolved?: boolean;
  resolution?: string;
  resolvedAt?: string;
}

export interface Message {
  content: string;
  timestamp: string;
}

export interface Meeting {
  id: string;
  name: string;
  description?: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  rocks: Rock[];
  headlines: Headline[];
  todos: Todo[];
  issues: Issue[];
  conclusion: string;
  members: string[];
  memberRatings?: Record<string, number>;
  messages?: Message[];
}

export interface MeetingContextType {
  meetings: Meeting[];
  currentMeetingId: string | null;
  currentUser: {
    id: string;
    name: string;
  };
  setCurrentMeeting: (meetingId: string | null) => void;
  updateMeetingConclusion: (meetingId: string, conclusion: string) => void;
  addTodo: (meetingId: string, todo: Omit<Todo, 'id'>) => void;
  updateTodoStatus: (meetingId: string, todoId: string, completed: boolean) => void;
  updateRockStatus: (meetingId: string, rockId: string, status: Rock['status']) => void;
  addIssue: (meetingId: string, issue: Omit<Issue, 'id'>) => void;
  addHeadline: (meetingId: string, headline: Omit<Headline, 'id'>) => void;
  updateMemberRating: (meetingId: string, member: string, rating: number) => void;
  sendMessage: (meetingId: string, content: string) => void;
  reorderIssues: (meetingId: string, oldIndex: number, newIndex: number) => void;
  resolveIssue: (meetingId: string, issueId: string, resolution: string) => void;
}
