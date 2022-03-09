import { ReactElement, useState } from "react";
import "../styles/task.scss";
import { ILevel, ITask } from "../types";
import { taskDateFormatter } from "../utils";

interface TaskProps {
	task: ITask;
	onChange: (task: ITask) => void;
}

export function Task({ task: initialTask }: TaskProps) {
	const [task, setTask] = useState<ITask>(initialTask);

	return (
		<article>
			<header>
				<div className="box-3 state" onClick={() => setTask({ ...task, done: !task.done })}>
					{task.done ? (
						<svg className="icon state-icon--done" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
							<path d="M13.9193 11.4991C11.6305 11.7549 9.79836 13.5614 9.53354 15.8256C8.82215 21.9079 8.82215 28.0524 9.53354 34.1346C9.79836 36.3989 11.6305 38.2054 13.9193 38.4612C19.873 39.1266 26.0322 39.1266 31.9859 38.4612C34.2747 38.2054 36.1069 36.3989 36.3717 34.1346C36.8828 29.7644 37.0267 25.362 36.8033 20.9736C36.7975 20.8603 36.8399 20.7497 36.9201 20.6695L38.9976 18.5919C39.2381 18.3515 39.649 18.5018 39.6745 18.8409C40.0666 24.0508 39.9589 29.2888 39.3514 34.4832C38.9217 38.1571 35.9719 41.0344 32.3191 41.4426C26.144 42.1328 19.7612 42.1328 13.5861 41.4426C9.93334 41.0344 6.98354 38.1571 6.55385 34.4832C5.81538 28.1693 5.81538 21.7909 6.55385 15.4771C6.98354 11.8032 9.93334 8.92587 13.5861 8.51762C19.7612 7.82746 26.144 7.82746 32.3191 8.51762C33.6056 8.66141 34.8049 9.11147 35.8376 9.79473C36.0409 9.92918 36.061 10.2149 35.8887 10.3872L34.2829 11.9929C34.1516 12.1243 33.9479 12.1464 33.7841 12.0586C33.2373 11.7656 32.6297 11.571 31.9859 11.4991C26.0322 10.8336 19.873 10.8336 13.9193 11.4991Z" />
							<path
								className="state-icon--done-path"
								d="M38.8919 12.9195L21.9525 29.8588L17.0132 24.9195"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					) : (
						<svg className="icon state-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M16.1596 20.7213C17.9859 20.5172 19.4608 19.0785 19.6757 17.2416C20.0449 14.0847 20.0449 10.8955 19.6757 7.73854C19.4608 5.90158 17.9859 4.46293 16.1596 4.25881C13.072 3.91373 9.88061 3.91373 6.79305 4.25881C4.96667 4.46293 3.49177 5.90158 3.27692 7.73854C2.90769 10.8955 2.90769 14.0847 3.27692 17.2416C3.49177 19.0785 4.96667 20.5172 6.79305 20.7213C9.88061 21.0664 13.072 21.0664 16.1596 20.7213ZM6.95966 5.74953C5.81523 5.87743 4.89918 6.78068 4.76677 7.91279C4.41108 10.9539 4.41108 14.0262 4.76677 17.0673C4.89918 18.1994 5.81523 19.1027 6.95966 19.2306C9.93649 19.5633 13.0161 19.5633 15.9929 19.2306C17.1374 19.1027 18.0534 18.1994 18.1858 17.0673C18.5415 14.0262 18.5415 10.9539 18.1858 7.91279C18.0534 6.78068 17.1374 5.87744 15.9929 5.74953C13.0161 5.41682 9.93649 5.41682 6.95966 5.74953Z"
							/>
						</svg>
					)}
				</div>
				<h3>{task.title}</h3>
			</header>

			<div className="stats">
				<div className="stat">
					<div className="box-3 box-3--2">
						<LevelIcon level={task.level} />
					</div>
					{ILevel[task.level]}
				</div>
				{task.due && (
					<div className="stat">
						<div className="box-3 box-3--2">
							<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V12C11.25 12.2586 11.3832 12.4989 11.6025 12.636L14.6025 14.511C14.9538 14.7305 15.4165 14.6238 15.636 14.2725C15.8555 13.9212 15.7488 13.4585 15.3975 13.239L12.75 11.5843V7Z" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 3.25C7.16751 3.25 3.25 7.16751 3.25 12C3.25 16.8325 7.16751 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12C20.75 7.16751 16.8325 3.25 12 3.25ZM4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
								/>
							</svg>
						</div>
						{taskDateFormatter.format(new Date(task.due)).split(" ").join(" - ")}
					</div>
				)}
			</div>

			{task.progress > 0 && (
				<footer>
					<div className="progress">
						<div className="progress-done" style={{ right: 100 - task.progress + "%" }}></div>
					</div>
				</footer>
			)}
		</article>
	);
}

function LevelIcon({ level }: { level: ILevel }) {
	const icons: { [Prop in ILevel]: ReactElement } = {
		// Default: Medium
		0: (
			<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M10.7895 9.19654C10.7895 8.99603 10.7092 8.80388 10.5665 8.66297C10.4239 8.52206 10.2308 8.44414 10.0303 8.4466C8.65077 8.46351 7.27168 8.52652 5.89533 8.63562L5.7066 8.65059C5.26765 8.68538 4.90256 9.00206 4.80609 9.43169C4.42762 11.1172 4.42776 12.8662 4.80621 14.5517C4.90239 14.98 5.26571 15.2964 5.7035 15.3326L5.87777 15.347C7.25968 15.4611 8.64458 15.527 10.0299 15.5446C10.2305 15.5472 10.4237 15.4693 10.5664 15.3284C10.7091 15.1874 10.7895 14.9952 10.7895 14.7947V9.19654Z" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5.66357 5.66382C9.21579 5.38684 12.7842 5.38684 16.3364 5.66382L17.684 5.76892C18.8937 5.86324 19.8836 6.76938 20.0842 7.966C20.5319 10.6367 20.5319 13.3633 20.0842 16.0341C19.8836 17.2307 18.8937 18.1368 17.684 18.2311L16.3364 18.3362C12.7842 18.6132 9.2158 18.6132 5.66357 18.3362L4.31596 18.2311C3.10632 18.1368 2.11643 17.2307 1.91582 16.034C1.46808 13.3633 1.46808 10.6367 1.91582 7.96597C2.11643 6.76935 3.10632 5.86321 4.31597 5.76889L5.66357 5.66382ZM16.2198 16.8407C12.7452 17.1117 9.25478 17.1117 5.78017 16.8407L4.43257 16.7357C3.90973 16.6949 3.48188 16.3032 3.39518 15.786C2.97496 13.2795 2.97496 10.7205 3.39518 8.21398C3.48188 7.69678 3.90973 7.30512 4.43257 7.26435L5.78017 7.15928C9.25478 6.88835 12.7452 6.88835 16.2198 7.15928L17.5674 7.26438C18.0903 7.30515 18.5181 7.6968 18.6048 8.21401C19.025 10.7205 19.025 13.2795 18.6048 15.786C18.5181 16.3033 18.0903 16.6949 17.5674 16.7357L16.2198 16.8407Z"
				/>
			</svg>
		),
		// Easy
		1: (
			<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
		),
		// Hard
		2: (
			<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M16.75 14.208V9.78988C16.75 9.18588 16.2857 8.68335 15.6836 8.63562C12.426 8.37738 9.15298 8.37738 5.89533 8.63562L5.7066 8.65058C5.26765 8.68538 4.90256 9.00205 4.80609 9.43168C4.42762 11.1172 4.42776 12.8662 4.80621 14.5516C4.90239 14.98 5.2657 15.2964 5.7035 15.3326L5.87777 15.347C9.14668 15.6169 12.4323 15.6169 15.7012 15.347C16.2939 15.298 16.75 14.8027 16.75 14.208Z" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5.66357 5.66382C9.2158 5.38684 12.7842 5.38684 16.3364 5.66382L17.684 5.76891C18.8937 5.86323 19.8836 6.76937 20.0842 7.96598C20.5319 10.6367 20.5319 13.3633 20.0842 16.034C19.8836 17.2307 18.8937 18.1368 17.684 18.2311L16.3364 18.3362C12.7842 18.6132 9.2158 18.6132 5.66357 18.3362L4.31597 18.2311C3.10633 18.1368 2.11644 17.2307 1.91583 16.034C1.46809 13.3633 1.46809 10.6367 1.91583 7.96597C2.11644 6.76936 3.10633 5.86321 4.31597 5.76889L5.66357 5.66382ZM16.2198 16.8407C12.7452 17.1117 9.25479 17.1117 5.78018 16.8407L4.43258 16.7357C3.90974 16.6949 3.48189 16.3032 3.39518 15.786C2.97497 13.2795 2.97497 10.7205 3.39518 8.21398C3.48189 7.69678 3.90974 7.30512 4.43258 7.26436L5.78018 7.15928C9.25479 6.88836 12.7452 6.88836 16.2198 7.15928L17.5674 7.26437C18.0903 7.30514 18.5181 7.69679 18.6048 8.21399C19.025 10.7205 19.025 13.2795 18.6048 15.786C18.5181 16.3032 18.0903 16.6949 17.5674 16.7357L16.2198 16.8407Z"
				/>
			</svg>
		),
	};

	return icons[level];
}
