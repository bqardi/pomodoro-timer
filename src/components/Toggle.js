import { useEffect, useState } from "react";
import "./Toggle.scss";

function Toggle({children, className, initial, onToggle}){
	var [on, setOn] = useState(initial);

	useEffect(() => {
		onToggle && onToggle(on);
	}, [on]);

	return (
		<div
			className={`Toggle${className ? " " + className : ""}`}
			onClick={() => setOn(prev => !prev)}
			tabIndex="0"
		>
			<span>{children}</span>
			<span className="Toggle__control">
				<span className={`Toggle__handle${on ? " Toggle__handle--on" : ""}`}></span>
				<span className="Toggle__track"></span>
			</span>
		</div>
	);
}

export default Toggle;