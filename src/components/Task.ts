export interface Task {
  title: string;
  level: Level,
  due: Date,
  done: boolean,
  progress?: number
}

export enum Level {
  Easy,
  Medium,
  Hard,
}