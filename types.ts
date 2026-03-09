
export interface Video {
  id: number;
  title: string;
  duration: string;
  thumb: string;
  videoId: string;
}

export interface Meal {
  id: number;
  type: string;
  title: string;
  cal: number | string;
  tags: string[];
}

export interface Event {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
}

export interface Resource {
  id: number;
  title: string;
  content: string; // Text content for the file
  type: 'Guide' | 'Plan';
}

export interface UserData {
  name?: string;
  email: string;
  age?: string;
  phone?: string;
}

export type UserRole = 'student' | 'admin' | null;

export interface CommunityPost {
  id: number;
  tag: string;
  text: string;
  likes: number;
  comments: number;
}

export interface Counselor {
  id: number;
  name: string;
  spec: string;
  available: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

export interface Registration {
  id: number;
  eventId: number;
  userEmail: string;
  userName: string;
  timestamp: string;
}
