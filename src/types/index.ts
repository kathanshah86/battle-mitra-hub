
export interface Tournament {
  id: string;
  title: string;
  gameType: GameType;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate: string;
  prizePool: string;
  entryFee: string | null;
  participantsCount: number;
  maxParticipants: number;
  format: string;
  description?: string;
  rules?: string[];
  organizer: string;
  region: string;
}

export type GameType = 'fps' | 'battle-royale' | 'moba' | 'sports' | 'card' | 'fighting';

export interface Player {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  wins: number;
  losses: number;
  winRate: number;
  tournamentWins: number;
  country: string;
  team?: string;
  earnings: number;
}

export interface LiveMatch {
  id: string;
  tournament: string;
  teamA: {
    name: string;
    logo: string;
    score: number;
  };
  teamB: {
    name: string;
    logo: string;
    score: number;
  };
  status: 'upcoming' | 'live' | 'completed';
  startTime: string;
  game: GameType;
  stream?: string;
}

export interface News {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content?: string;
}
