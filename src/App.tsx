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
				<Task
					key={"task-" + i}
					task={t}
					onChange={(changedTask) => {
						setTasks(tasks.map((task) => (task.id === changedTask.id ? changedTask : task)));
					}}
				/>
			))}
		</>
	);
}
("");
