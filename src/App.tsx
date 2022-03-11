import { TaskForm } from "./components/TaskForm";
import { Task } from "./components/Task";
import "./styles/common.scss";
import "./styles/home.scss";
import { useState } from "react";
import { ITask } from "./types";
import { SlideForm } from "./components/SlideForm";

export function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [taskFormState, setTaskFormState] = useState<boolean>();

	return (
		<main className="container">
			<SlideForm onChange={(state) => setTaskFormState(state)}>
				<TaskForm onSubmit={(task) => setTasks([...tasks, task])} isFocus={taskFormState} />
			</SlideForm>

			<div className="grid">
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onChange={(cT) => {
							setTasks(tasks.map((t) => (t.id !== cT.id ? t : cT)));
						}}
						onDelete={(id) => {
							setTasks(tasks.filter((t) => t.id !== id));
						}}
					/>
				))}
			</div>
		</main>
	);
}
("");
