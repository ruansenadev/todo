import { TaskForm } from "./components/TaskForm";
import { Task } from "./components/Task";
import "./styles/common.scss";
import { useState } from "react";
import { ITask } from "./types";

export function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);

	return (
		<>
			<TaskForm onSubmit={(task) => setTasks([...tasks, task])} />

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
		</>
	);
}
("");
