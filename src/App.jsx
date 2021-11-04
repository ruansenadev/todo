import { TaskForm } from "./components/TaskForm";
import { Task } from "./components/Task";
import "./styles/common.scss";

export function App() {
  return (
    <>
      <TaskForm />
      <Task />
    </>
  );
}