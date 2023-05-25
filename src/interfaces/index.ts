
export type Game = {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: Date;
}

export type Provider = {
  id: number;
  name: string;
  logo: string;
}

export type Group = {
  id: number;
  name: string;
  games: Array<Game['id']>
}

export type Data = {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

export enum SortType {
  Increase = 'increase',
  Decrease = 'decrease',
  Newest = 'newest'
}