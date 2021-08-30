import { useEffect, useState } from "react";
import "./Toggle.scss";

function Toggle({children, className, initial, onToggle}){
	var [on, setOn] = useState(initial);

	useEffect(() => {
		onToggle && onToggle(on);
	}, [on]);

	return (
		<button
			className={`Toggle${className ? " " + className : ""}`}
			onClick={() => setOn(prev => !prev)}
			tabIndex="0"
			type="button"
		>
			<span>{children}</span>
			<span className="Toggle__control">
				<span className={`Toggle__handle${on ? " Toggle__handle--on" : ""}`}></span>
				<span className="Toggle__track"></span>
			</span>
		</button>
	);
}

export default Toggle;