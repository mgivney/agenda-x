
// This file re-exports everything from our refactored structure
// for backwards compatibility
import { MeetingProvider, useMeetingContext } from './meetingContext';
import { Todo, Headline, Rock, Issue, Message, Meeting, MeetingContextType } from './types';

export { 
  MeetingProvider, 
  useMeetingContext,
  Todo,
  Headline,
  Rock,
  Issue,
  Message,
  Meeting,
  MeetingContextType
};
