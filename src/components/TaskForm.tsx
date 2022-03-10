import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";
import "../styles/form.scss";
import { ILevel, ITask } from "../types";

const taskTitles = ["Learn something new", "Read a book", "Visit anywhere", "Meet with someone"];

interface TaskFormData {
	title: { value: string };
	level: NodeListOf<Node & { checked: boolean; value: ILevel }>;
	due: { value: string };
}

interface TaskFormProps {
	onSubmit: (task: ITask) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
	const [titleIndex, setTitleIndex] = useState<number>(Math.floor(Math.random() * taskTitles.length));
	const today = new Date();

	function clearForm(form: HTMLFormElement) {
		(form.elements as typeof form.elements & TaskFormData).level.forEach((lNode) => (lNode.checked = lNode.value == ILevel.Default ? true : false));
		(form.elements as typeof form.elements & TaskFormData).title.value = "";
		(form.elements as typeof form.elements & TaskFormData).due.value = "";
	}

	function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { title, level: levelNodeList, due } = e.currentTarget.elements as typeof e.currentTarget.elements & TaskFormData;
		const level = Array.from(levelNodeList).find((l) => l.checked);

		if (title.value && level?.value) {
			const task: ITask = { id: nanoid(), title: title.value, level: Number(level?.value), done: false, progress: 0 };
			if (due.value) {
				task.due = new Date(due.value);
			}

			onSubmit(task);
			clearForm(e.currentTarget);
			setTitleIndex(Math.floor(Math.random() * taskTitles.length));
		}
	}

	return (
		<section>
			<h1>Create task</h1>
			<form onSubmit={handleFormSubmit}>
				<fieldset>
					<label htmlFor="taskTitleInput" aria-required="true">
						Task title
					</label>
					<input
						id="taskTitleInput"
						className="input"
						type="text"
						name="title"
						placeholder={taskTitles[titleIndex]}
						spellCheck="false"
						maxLength={55}
						required
					/>
				</fieldset>
				<fieldset>
					<label aria-required="true">Select level</label>
					<div className="row">
						<input id="taskLevelEasy" type="radio" name="level" hidden defaultValue={ILevel.Easy} />
						<label className="option" htmlFor="taskLevelEasy">
							<div className="box-2">
								<svg className="icon option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.50914 8.82899C6.66268 8.97095 6.74999 9.17057 6.74999 9.37969L6.74999 14.6045C6.74999 14.814 6.66236 15.0139 6.50831 15.1559C6.35426 15.2979 6.14784 15.369 5.93903 15.352L5.70349 15.3326C5.2657 15.2964 4.90238 14.98 4.8062 14.5516C4.42775 12.8662 4.42761 11.1172 4.80608 9.43168C4.90255 9.00205 5.26764 8.68537 5.70659 8.65058M6.50914 8.82899C6.35559 8.68703 5.91506 8.63421 5.70659 8.65058Z"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.66357 18.3362C9.2158 18.6132 12.7842 18.6132 16.3364 18.3362L17.684 18.2311C18.8937 18.1368 19.8836 17.2307 20.0842 16.034C20.5319 13.3633 20.5319 10.6367 20.0842 7.96598C19.8836 6.76936 18.8937 5.86322 17.684 5.7689L16.3364 5.66382C12.7842 5.38684 9.21579 5.38684 5.66357 5.66382L4.31597 5.76889C3.10632 5.86321 2.11643 6.76935 1.91582 7.96597C1.46808 10.6367 1.46808 13.3633 1.91582 16.034C2.11643 17.2306 3.10632 18.1368 4.31596 18.2311L5.66357 18.3362ZM16.2198 7.15928C12.7452 6.88835 9.25478 6.88835 5.78017 7.15928L4.43257 7.26435C3.90973 7.30512 3.48188 7.69678 3.39518 8.21398C2.97496 10.7205 2.97496 13.2795 3.39518 15.786C3.48188 16.3032 3.90973 16.6949 4.43257 16.7357L5.78017 16.8407C9.25478 17.1117 12.7452 17.1117 16.2198 16.8407L17.5674 16.7357C18.0903 16.6949 18.5181 16.3032 18.6048 15.786C19.025 13.2795 19.025 10.7205 18.6048 8.21399C18.5181 7.69678 18.0903 7.30513 17.5674 7.26436L16.2198 7.15928Z"
									/>
								</svg>
							</div>
							Easy
						</label>
						<input id="taskLevelMedium" type="radio" name="level" hidden defaultValue={ILevel.Medium} defaultChecked />
						<label className="option" htmlFor="taskLevelMedium">
							<div className="box-2">
								<svg className="icon option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M10.7895 9.19654C10.7895 8.99603 10.7092 8.80388 10.5665 8.66297C10.4239 8.52206 10.2308 8.44414 10.0303 8.4466C8.65077 8.46351 7.27168 8.52652 5.89533 8.63562L5.7066 8.65059C5.26765 8.68538 4.90256 9.00206 4.80609 9.43169C4.42762 11.1172 4.42776 12.8662 4.80621 14.5517C4.90239 14.98 5.26571 15.2964 5.7035 15.3326L5.87777 15.347C7.25968 15.4611 8.64458 15.527 10.0299 15.5446C10.2305 15.5472 10.4237 15.4693 10.5664 15.3284C10.7091 15.1874 10.7895 14.9952 10.7895 14.7947V9.19654Z" />
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.66357 5.66382C9.21579 5.38684 12.7842 5.38684 16.3364 5.66382L17.684 5.76892C18.8937 5.86324 19.8836 6.76938 20.0842 7.966C20.5319 10.6367 20.5319 13.3633 20.0842 16.0341C19.8836 17.2307 18.8937 18.1368 17.684 18.2311L16.3364 18.3362C12.7842 18.6132 9.2158 18.6132 5.66357 18.3362L4.31596 18.2311C3.10632 18.1368 2.11643 17.2307 1.91582 16.034C1.46808 13.3633 1.46808 10.6367 1.91582 7.96597C2.11643 6.76935 3.10632 5.86321 4.31597 5.76889L5.66357 5.66382ZM16.2198 16.8407C12.7452 17.1117 9.25478 17.1117 5.78017 16.8407L4.43257 16.7357C3.90973 16.6949 3.48188 16.3032 3.39518 15.786C2.97496 13.2795 2.97496 10.7205 3.39518 8.21398C3.48188 7.69678 3.90973 7.30512 4.43257 7.26435L5.78017 7.15928C9.25478 6.88835 12.7452 6.88835 16.2198 7.15928L17.5674 7.26438C18.0903 7.30515 18.5181 7.6968 18.6048 8.21401C19.025 10.7205 19.025 13.2795 18.6048 15.786C18.5181 16.3033 18.0903 16.6949 17.5674 16.7357L16.2198 16.8407Z"
									/>
								</svg>
							</div>
							Medium
						</label>
						<input id="taskLevelHard" type="radio" name="level" hidden defaultValue={ILevel.Hard} />
						<label className="option" htmlFor="taskLevelHard">
							<div className="box-2">
								<svg className="icon option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M16.75 14.208V9.78988C16.75 9.18588 16.2857 8.68335 15.6836 8.63562C12.426 8.37738 9.15298 8.37738 5.89533 8.63562L5.7066 8.65058C5.26765 8.68538 4.90256 9.00205 4.80609 9.43168C4.42762 11.1172 4.42776 12.8662 4.80621 14.5516C4.90239 14.98 5.2657 15.2964 5.7035 15.3326L5.87777 15.347C9.14668 15.6169 12.4323 15.6169 15.7012 15.347C16.2939 15.298 16.75 14.8027 16.75 14.208Z" />
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.66357 5.66382C9.2158 5.38684 12.7842 5.38684 16.3364 5.66382L17.684 5.76891C18.8937 5.86323 19.8836 6.76937 20.0842 7.96598C20.5319 10.6367 20.5319 13.3633 20.0842 16.034C19.8836 17.2307 18.8937 18.1368 17.684 18.2311L16.3364 18.3362C12.7842 18.6132 9.2158 18.6132 5.66357 18.3362L4.31597 18.2311C3.10633 18.1368 2.11644 17.2307 1.91583 16.034C1.46809 13.3633 1.46809 10.6367 1.91583 7.96597C2.11644 6.76936 3.10633 5.86321 4.31597 5.76889L5.66357 5.66382ZM16.2198 16.8407C12.7452 17.1117 9.25479 17.1117 5.78018 16.8407L4.43258 16.7357C3.90974 16.6949 3.48189 16.3032 3.39518 15.786C2.97497 13.2795 2.97497 10.7205 3.39518 8.21398C3.48189 7.69678 3.90974 7.30512 4.43258 7.26436L5.78018 7.15928C9.25479 6.88836 12.7452 6.88836 16.2198 7.15928L17.5674 7.26437C18.0903 7.30514 18.5181 7.69679 18.6048 8.21399C19.025 10.7205 19.025 13.2795 18.6048 15.786C18.5181 16.3032 18.0903 16.6949 17.5674 16.7357L16.2198 16.8407Z"
									/>
								</svg>
							</div>
							Hard
						</label>
					</div>
				</fieldset>
				<fieldset>
					<label htmlFor="taskDueInput" aria-required="false">
						Set due
					</label>
					<input id="taskDueInput" className="input" type="datetime-local" name="due" min={today.toISOString().slice(0, 16)} />
				</fieldset>
				<button type="submit">Done</button>
			</form>
		</section>
	);
}
