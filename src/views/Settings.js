import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import Toggle from "../components/Toggle";
import useGlobalContext from "../contexts/GlobalContext";
import useLamp from "../hooks/useLamp";
import "./Settings.scss";

function Settings(){
	var {
		moveCompleted, setMoveCompleted,
		autostartBreak, setAutostartBreak,
		lampOn, setLampOn,
		cookies, setCookie,
		pomodoroSettings, setPomodoroSettings
	} = useGlobalContext();
	var {getData, control} = useLamp();

	var [data, setData] = useState({});

	useEffect(() => {
		if (data.hasOwnProperty("on")) {
			control({
				on: !data.on,
				sat: 0,
				bri: 100,
				hue: 0
			});
		}
	}, [data, control]);

	return (
		<main className="Settings">
			<h1 className="Settings__title">Settings</h1>
			<form>
				<Toggle initial={lampOn} onToggle={setLampOn} className="Settings__toggle">
					Use Philips hue
				</Toggle>
				<div className={`Settings__lamp${lampOn ? " Settings__lamp--active" : ""}`}>
					<div className="Settings__inner">
						<InputField
							name="ip"
							label="IP:"
							value={cookies.lampSettings?.ip || ""}
							onValue={value => setCookie("lampSettings", {
								...cookies.lampSettings,
								ip: value
							})}
						/>
						<InputField
							name="username"
							label="Username:"
							value={cookies.lampSettings?.username || ""}
							onValue={value => setCookie("lampSettings", {
								...cookies.lampSettings,
								username: value
							})}
						/>
						<InputField
							name="lampid"
							label="Lamp ID:"
							value={cookies.lampSettings?.lampid || ""}
							onValue={value => setCookie("lampSettings", {
								...cookies.lampSettings,
								lampid: value
							})}
						/>
						<div className="InputField">
							<label className="InputField__label">Test lamp:</label>
							<button className="InputField__button" onClick={() => getData(data => setData(data))} type="button">{data.on ? "Switch off" : "Switch on"}</button>
						</div>
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
				<div className="Settings__inner">
					<InputField
						name="task"
						label="Task time:"
						value={pomodoroSettings.task.duration || ""}
						onValue={value => setPomodoroSettings(prev => {
							return {
								...prev,
								task: {
									...prev.task,
									duration: value
								}
							}
						})}
					/>
					<InputField
						name="break"
						label="Break time:"
						value={pomodoroSettings.break.duration || ""}
						onValue={value => setPomodoroSettings(prev => {
							return {
								...prev,
								break: {
									...prev.break,
									duration: value
								}
							}
						})}
					/>
					<InputField
						name="long-break"
						label="Long break:"
						value={pomodoroSettings.longBreak.duration || ""}
						onValue={value => setPomodoroSettings(prev => {
							return {
								...prev,
								longBreak: {
									...prev.longBreak,
									duration: value
								}
							}
						})}
					/>
					<InputField
						name="long-break-interval"
						label="Interval:"
						value={pomodoroSettings.longBreakInterval || ""}
						onValue={value => setPomodoroSettings(prev => {
							return {
								...prev,
								longBreakInterval: value
							}
						})}
					/>
				</div>
			</form>
		</main>
	);
}

export default Settings;