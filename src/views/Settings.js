import { useEffect } from "react";
import InputField from "../components/InputField";
import Toggle from "../components/Toggle";
import useGlobalContext from "../contexts/GlobalContext";
import useLamp from "../hooks/useLamp";
import "./Settings.scss";

function Settings(){
	var {
		moveCompleted, setMoveCompleted,
		autostartBreak, setAutostartBreak,
		lamp, setLamp
	} = useGlobalContext();
	var {data, control} = useLamp();

	function testLamp(){
		control({
			on: !data.on,
			sat: 0,
			bri: 100,
			hue: 0
		});
	}

	useEffect(() => {
		if (!lamp) control({on: false});
	}, [lamp, control]);

	return (
		<main className="Settings">
			<h1 className="Settings__title">Settings</h1>
			<form>
				<Toggle initial={lamp} onToggle={setLamp} className="Settings__toggle">
					Use Philips hue
				</Toggle>
				<div className={`Settings__lamp${lamp ? " Settings__lamp--active" : ""}`}>
					<div className="Settings__inner">
						<InputField name="ip" label="IP:" />
						<InputField name="username" label="Username:" />
						<InputField name="lampid" label="Lamp ID:" />
						<label>Color settings</label>
						<button onClick={testLamp} type="button">{data.on ? "Switch off" : "Switch on"}</button>
					</div>
				</div>
				<Toggle initial={autostartBreak} onToggle={setAutostartBreak} className="Settings__toggle">
					Autostart break
				</Toggle>
				<Toggle initial={moveCompleted} onToggle={setMoveCompleted} className="Settings__toggle">
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
			</form>
		</main>
	);
}

export default Settings;