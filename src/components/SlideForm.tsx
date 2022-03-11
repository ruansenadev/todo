import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/slide-form.scss";

interface SlideFormProps {
	onChange?: (isShow: boolean) => void;
	children: ReactNode;
}

export function SlideForm({ children, onChange }: SlideFormProps) {
	const slideRef = useRef<HTMLDivElement>(null);
	const [offsetLeft, setOffsetLeft] = useState<string | number>();
	const [isShow, setIsShow] = useState<boolean>();
	const [contentMaxH, setContentMaxH] = useState<number | null>();

	useLayoutEffect(() => {
		if (slideRef.current) {
			// calc container padding
			const leftContentOffset = slideRef.current.offsetLeft;
			// calc container margin
			const leftParentContentOffset = slideRef.current.parentElement?.offsetLeft ?? "0px";

			setOffsetLeft(`calc(${leftContentOffset} + ${leftParentContentOffset})`);
		}
	}, [slideRef]);

	useEffect(() => {
		if (slideRef.current) {
			const maxHeight = window.innerHeight;
			if (maxHeight <= slideRef.current.offsetHeight) {
				setContentMaxH(maxHeight);
			} else {
				setContentMaxH(null);
			}
		}
		onChange && onChange(!!isShow);
	}, [isShow]);

	return (
		<div
			ref={slideRef}
			className={`slide${offsetLeft ? " slide--init" : ""}${typeof isShow === "boolean" ? (isShow ? " slide--show" : " slide--hide") : ""}`}
			style={{ left: offsetLeft }}
		>
			<div className="slide-content" style={{ maxHeight: contentMaxH ? contentMaxH : "", overflowY: contentMaxH ? "scroll" : "unset" }}>
				{children}
				<button className="btn" onClick={() => setIsShow(!isShow)} style={{ bottom: contentMaxH ? (isShow ? 0 : "-1.8rem") : "-1.8rem" }}>
					<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							className={`btn-icon-stroke${typeof isShow === "boolean" ? (isShow ? " btn-icon-stroke--close" : " btn-icon-stroke--plus") : ""}`}
							d="M12 17V7"
							strokeWidth="1"
							strokeLinecap="round"
						/>
						<path
							className={`btn-icon-stroke${typeof isShow === "boolean" ? (isShow ? " btn-icon-stroke--close" : " btn-icon-stroke--plus") : ""}`}
							d="M7 12L17 12"
							strokeWidth="1"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
