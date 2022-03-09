export type ITask = {
	title: string;
	level: ILevel;
	due?: Date;
	done: boolean;
	progress: number;
};
export enum ILevel {
  Default,
	Easy,
	Hard,
  // enum assignment must be the last for enum increasing work properly
	Medium = Default,
}
