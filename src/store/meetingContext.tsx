
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Todo {
  id: string;
  description: string;
  assignee: string;
  completed: boolean;
}

export interface Headline {
  id: string;
  content: string;
  reporter: string;
}

export interface Rock {
  id: string;
  description: string;
  owner: string;
  status: 'on-track' | 'off-track' | 'completed';
}

export interface Issue {
  id: string;
  description: string;
  reporter: string;
  category: string;
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
}

interface MeetingContextType {
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
}

// Initial data
const initialMeetings: Meeting[] = [
  {
    id: '1',
    name: 'Marketing Team L10',
    description: 'Weekly leadership meeting for the marketing department',
    dayOfWeek: 'Monday',
    time: '10:00 AM',
    duration: '90 min',
    rocks: [
      {
        id: '101',
        description: 'Launch new product landing page',
        owner: 'Jane Smith',
        status: 'on-track'
      },
      {
        id: '102',
        description: 'Complete Q3 marketing plan',
        owner: 'John Doe',
        status: 'off-track'
      }
    ],
    headlines: [
      {
        id: '201',
        content: 'Social media campaign reached 10k impressions',
        reporter: 'Jane Smith'
      },
      {
        id: '202',
        content: 'New blog post published with high engagement',
        reporter: 'John Doe'
      }
    ],
    todos: [
      {
        id: '301',
        description: 'Schedule photoshoot for new products',
        assignee: 'Jane Smith',
        completed: false
      },
      {
        id: '302',
        description: 'Review analytics report',
        assignee: 'John Doe',
        completed: true
      }
    ],
    issues: [
      {
        id: '401',
        description: 'Website traffic declining on product pages',
        reporter: 'Jane Smith',
        category: 'Marketing'
      },
      {
        id: '402',
        description: 'Need more budget for paid advertising',
        reporter: 'John Doe',
        category: 'Finance'
      }
    ],
    conclusion: '',
    members: ['Jane Smith', 'John Doe', 'Current User']
  },
  {
    id: '2',
    name: 'Sales Team L10',
    description: 'Weekly leadership meeting for the sales team',
    dayOfWeek: 'Wednesday',
    time: '9:00 AM',
    duration: '90 min',
    rocks: [
      {
        id: '103',
        description: 'Implement new CRM system',
        owner: 'Alex Johnson',
        status: 'on-track'
      },
      {
        id: '104',
        description: 'Hire two new sales representatives',
        owner: 'Sarah Williams',
        status: 'on-track'
      }
    ],
    headlines: [
      {
        id: '203',
        content: 'Closed largest deal of the quarter',
        reporter: 'Alex Johnson'
      },
      {
        id: '204',
        content: 'Sales team exceeded monthly quota by 15%',
        reporter: 'Sarah Williams'
      }
    ],
    todos: [
      {
        id: '303',
        description: 'Update sales pitch deck',
        assignee: 'Alex Johnson',
        completed: false
      },
      {
        id: '304',
        description: 'Schedule training for new sales hires',
        assignee: 'Sarah Williams',
        completed: false
      }
    ],
    issues: [
      {
        id: '403',
        description: 'Long sales cycle for enterprise clients',
        reporter: 'Alex Johnson',
        category: 'Sales Process'
      },
      {
        id: '404',
        description: 'Need updated competitive analysis',
        reporter: 'Sarah Williams',
        category: 'Market Research'
      }
    ],
    conclusion: '',
    members: ['Alex Johnson', 'Sarah Williams', 'Current User']
  },
  {
    id: '3',
    name: 'Executive L10',
    description: 'Weekly leadership meeting for the executive team',
    dayOfWeek: 'Friday',
    time: '1:00 PM',
    duration: '90 min',
    rocks: [
      {
        id: '105',
        description: 'Finalize 5-year strategic plan',
        owner: 'Michael Roberts',
        status: 'off-track'
      },
      {
        id: '106',
        description: 'Complete Q4 budget allocation',
        owner: 'Lisa Chen',
        status: 'on-track'
      }
    ],
    headlines: [
      {
        id: '205',
        content: 'New partnership agreement signed with key vendor',
        reporter: 'Michael Roberts'
      },
      {
        id: '206',
        content: 'Company featured in industry publication',
        reporter: 'Lisa Chen'
      }
    ],
    todos: [
      {
        id: '305',
        description: 'Schedule board meeting',
        assignee: 'Michael Roberts',
        completed: true
      },
      {
        id: '306',
        description: 'Review quarterly financial statements',
        assignee: 'Lisa Chen',
        completed: false
      }
    ],
    issues: [
      {
        id: '405',
        description: 'Rising operations costs impacting margins',
        reporter: 'Michael Roberts',
        category: 'Finance'
      },
      {
        id: '406',
        description: 'Need to improve employee retention',
        reporter: 'Lisa Chen',
        category: 'HR'
      }
    ],
    conclusion: '',
    members: ['Michael Roberts', 'Lisa Chen', 'Current User']
  }
];

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);
  const currentUser = {
    id: '1001',
    name: 'Current User'
  };

  const setCurrentMeeting = (meetingId: string | null) => {
    setCurrentMeetingId(meetingId);
  };

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

  return (
    <MeetingContext.Provider 
      value={{ 
        meetings, 
        currentMeetingId, 
        currentUser,
        setCurrentMeeting,
        updateMeetingConclusion,
        addTodo,
        updateTodoStatus,
        updateRockStatus,
        addIssue,
        addHeadline
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }
  return context;
};
