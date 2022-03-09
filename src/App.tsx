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
			{tasks.map((t, i) => (
				<Task task={t} key={"task-" + i} />
			))}
		</>
	);
}
