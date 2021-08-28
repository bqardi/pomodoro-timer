import { useState } from "react";
import Toggle from "../components/Toggle";
import "./Settings.scss";

function Settings(){
	var [lamp, setLamp] = useState(false);
	var [pause, setPause] = useState(false);
	var [completed, setCompleted] = useState(true);
	
	return (
		<main className="Settings">
			<h1 className="Settings__title">Settings</h1>
			<Toggle initial={lamp} onToggle={setLamp} className="Settings__toggle">
				Use Philips hue
			</Toggle>
			<div className={`Settings__lamp${lamp ? " Settings__lamp--active" : ""}`}>
				<p>IP:</p>
				<p>Username</p>
				<p>Lamp ID</p>
				<p>Connection test</p>
				<p>Color settings</p>
			</div>
			<Toggle initial={pause} onToggle={setPause} className="Settings__toggle">
				Pause on break
			</Toggle>
			<Toggle initial={completed} onToggle={setCompleted} className="Settings__toggle">
				Move to completed list
			</Toggle>
			{/* Enable/disable lamp */}
			{/* - Setup: IP, Username, Lamp ID */}
			{/* - Connection test */}
			{/* - Colors: task, break, long break */}
			{/* Pause on break */}
			{/* Move to completed list (or not) */}
			{/* Time: task, break, long break, pomodoros before long break */}
			{/*  */}
		</main>
	);
}

export default Settings;