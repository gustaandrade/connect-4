export type Player = 1 | 2;

export type PlayerPrefs = {
  color: string;
  name: string;
  wins: number;
};

export type Board = Player[][];
