
import { Meeting } from './types';

export const initialMeetings: Meeting[] = [
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
        status: 'on-track',
        createdAt: '2023-10-15'
      },
      {
        id: '102',
        description: 'Complete Q3 marketing plan',
        owner: 'John Doe',
        status: 'off-track',
        createdAt: '2023-09-28'
      },
      {
        id: '103',
        description: 'Develop social media strategy for Q4',
        owner: 'You',
        status: 'on-track',
        createdAt: '2023-11-02'
      }
    ],
    headlines: [
      {
        id: '201',
        content: 'Social media campaign reached 10k impressions',
        reporter: 'Jane Smith',
        createdAt: '2023-10-20'
      },
      {
        id: '202',
        content: 'New blog post published with high engagement',
        reporter: 'John Doe',
        createdAt: '2023-10-18'
      },
      {
        id: '203',
        content: 'Email newsletter open rate increased by 15%',
        reporter: 'You',
        createdAt: '2023-11-05'
      }
    ],
    todos: [
      {
        id: '301',
        description: 'Schedule photoshoot for new products',
        assignee: 'Jane Smith',
        completed: false,
        createdAt: '2023-10-12'
      },
      {
        id: '302',
        description: 'Review analytics report',
        assignee: 'John Doe',
        completed: true,
        createdAt: '2023-10-10'
      },
      {
        id: '303',
        description: 'Prepare content calendar for November',
        assignee: 'You',
        completed: false,
        createdAt: '2023-10-25'
      }
    ],
    issues: [
      {
        id: '401',
        description: 'Website traffic declining on product pages',
        reporter: 'Jane Smith',
        category: 'Marketing',
        createdAt: '2023-10-08'
      },
      {
        id: '402',
        description: 'Need more budget for paid advertising',
        reporter: 'John Doe',
        category: 'Finance',
        createdAt: '2023-10-05'
      },
      {
        id: '403',
        description: 'Competitor launched similar campaign',
        reporter: 'You',
        category: 'Competition',
        createdAt: '2023-11-01'
      }
    ],
    conclusion: '',
    members: ['Jane Smith', 'John Doe', 'You']
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
        id: '104',
        description: 'Implement new CRM system',
        owner: 'Alex Johnson',
        status: 'on-track',
        createdAt: '2023-09-15'
      },
      {
        id: '105',
        description: 'Hire two new sales representatives',
        owner: 'Sarah Williams',
        status: 'on-track',
        createdAt: '2023-09-10'
      },
      {
        id: '106',
        description: 'Develop sales training program',
        owner: 'You',
        status: 'off-track',
        createdAt: '2023-10-01'
      }
    ],
    headlines: [
      {
        id: '204',
        content: 'Closed largest deal of the quarter',
        reporter: 'Alex Johnson',
        createdAt: '2023-10-12'
      },
      {
        id: '205',
        content: 'Sales team exceeded monthly quota by 15%',
        reporter: 'Sarah Williams',
        createdAt: '2023-10-30'
      },
      {
        id: '206',
        content: 'New territory expansion approved',
        reporter: 'You',
        createdAt: '2023-11-02'
      }
    ],
    todos: [
      {
        id: '304',
        description: 'Update sales pitch deck',
        assignee: 'Alex Johnson',
        completed: false,
        createdAt: '2023-10-05'
      },
      {
        id: '305',
        description: 'Schedule training for new sales hires',
        assignee: 'Sarah Williams',
        completed: false,
        createdAt: '2023-10-15'
      },
      {
        id: '306',
        description: 'Create proposal for enterprise client',
        assignee: 'You',
        completed: true,
        createdAt: '2023-10-20'
      }
    ],
    issues: [
      {
        id: '404',
        description: 'Long sales cycle for enterprise clients',
        reporter: 'Alex Johnson',
        category: 'Sales Process',
        createdAt: '2023-09-28'
      },
      {
        id: '405',
        description: 'Need updated competitive analysis',
        reporter: 'Sarah Williams',
        category: 'Market Research',
        createdAt: '2023-10-10'
      },
      {
        id: '406',
        description: 'Pricing concerns from multiple prospects',
        reporter: 'You',
        category: 'Pricing',
        createdAt: '2023-10-25'
      }
    ],
    conclusion: '',
    members: ['Alex Johnson', 'Sarah Williams', 'You']
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
        id: '107',
        description: 'Finalize 5-year strategic plan',
        owner: 'Michael Roberts',
        status: 'completed',
        createdAt: '2023-08-15'
      },
      {
        id: '108',
        description: 'Complete Q4 budget allocation',
        owner: 'Lisa Chen',
        status: 'completed',
        createdAt: '2023-09-20'
      },
      {
        id: '109',
        description: 'Prepare annual shareholder presentation',
        owner: 'You',
        status: 'completed',
        createdAt: '2023-10-05'
      },
      {
        id: '110',
        description: 'Launch employee wellness program',
        owner: 'Lisa Chen',
        status: 'completed',
        createdAt: '2023-11-15'
      },
      {
        id: '111',
        description: 'Implement new cyber security measures',
        owner: 'Michael Roberts',
        status: 'completed',
        createdAt: '2023-12-01'
      }
    ],
    todos: [
      {
        id: '307',
        description: 'Schedule board meeting',
        assignee: 'Michael Roberts',
        completed: true,
        createdAt: '2023-10-01'
      },
      {
        id: '308',
        description: 'Review quarterly financial statements',
        assignee: 'Lisa Chen',
        completed: true,
        createdAt: '2023-10-10'
      },
      {
        id: '309',
        description: 'Finalize executive compensation plan',
        assignee: 'You',
        completed: true,
        createdAt: '2023-10-20'
      },
      {
        id: '310',
        description: 'Update risk assessment report',
        assignee: 'Michael Roberts',
        completed: true,
        createdAt: '2023-11-05'
      },
      {
        id: '311',
        description: 'Prepare year-end performance reviews',
        assignee: 'Lisa Chen',
        completed: true,
        createdAt: '2023-11-20'
      },
      {
        id: '312',
        description: 'Draft sustainability initiative proposal',
        assignee: 'You',
        completed: true,
        createdAt: '2023-12-05'
      }
    ],
    issues: [
      {
        id: '407',
        description: 'Rising operations costs impacting margins',
        reporter: 'Michael Roberts',
        category: 'Finance',
        createdAt: '2023-09-15',
        resolved: true,
        resolution: 'Implemented cost-saving measures across departments',
        resolvedAt: '2023-10-15'
      },
      {
        id: '408',
        description: 'Need to improve employee retention',
        reporter: 'Lisa Chen',
        category: 'HR',
        createdAt: '2023-10-05',
        resolved: true,
        resolution: 'Developed new employee benefits package',
        resolvedAt: '2023-11-10'
      },
      {
        id: '409',
        description: 'Supply chain disruptions affecting delivery',
        reporter: 'You',
        category: 'Operations',
        createdAt: '2023-10-12',
        resolved: true,
        resolution: 'Established partnerships with alternative suppliers',
        resolvedAt: '2023-11-25'
      },
      {
        id: '410',
        description: 'Competitor launching similar product',
        reporter: 'Michael Roberts',
        category: 'Strategy',
        createdAt: '2023-11-01',
        resolved: true,
        resolution: 'Accelerated product roadmap and enhanced features',
        resolvedAt: '2023-12-01'
      },
      {
        id: '411',
        description: 'Data compliance requirements update needed',
        reporter: 'Lisa Chen',
        category: 'Legal',
        createdAt: '2023-11-15',
        resolved: true,
        resolution: 'Updated policies and implemented new compliance tools',
        resolvedAt: '2023-12-10'
      }
    ],
    headlines: [
      {
        id: '207',
        content: 'New partnership agreement signed with key vendor',
        reporter: 'Michael Roberts',
        createdAt: '2023-10-28'
      },
      {
        id: '208',
        content: 'Company featured in industry publication',
        reporter: 'Lisa Chen',
        createdAt: '2023-11-01'
      },
      {
        id: '209',
        content: 'Q3 financial results exceed expectations',
        reporter: 'You',
        createdAt: '2023-10-15'
      }
    ],
    conclusion: '',
    members: ['Michael Roberts', 'Lisa Chen', 'You']
  }
];
