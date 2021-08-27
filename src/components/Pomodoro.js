import { useEffect } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import usePomodoro from "../hooks/usePomodoro";
import "./Pomodoro.scss";

function Pomodoro(){
	var {state, dispatch, ACTION_TYPES} = useGlobalContext();
	var {startTimer, pauseTimer, stopTimer, skip, time, settings} = usePomodoro();

	useEffect(() => {
		if (state.pomodoros > 1 && state.activeTask !== null) {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: state.activeTask.id, amount: -1}});
		}
		// eslint-disable-next-line
	}, [state.pomodoros, dispatch, ACTION_TYPES]);
	useEffect(() => {
		if (state.activeTask === null) {
			stopTimer();
		}
		// eslint-disable-next-line
	}, [state.activeTask]);

	return (
		<div className={`Pomodoro Pomodoro--${state.type}`}>
			<div className="Pomodoro__inner">
				{state.activeTask && <p className="Pomodoro__activeTask">Active task:&nbsp;<span>{state.activeTask.description}</span></p>}
				<DisplayTime time={convertTime(settings.duration, time)} />
				<p>{parseString(settings.title, settings.duration)}</p>
				<div className="Pomodoro__buttons">
					{state.started
						? <button
								className="Pomodoro__button Pomodoro__button--main"
								onClick={pauseTimer}
								title="Start pomodoro timer"
							>
								<svg viewBox="0 0 24 24"><path d="M14,19H18V5H14M6,19H10V5H6V19Z"></path></svg>
							</button>
						: <button
								className={`Pomodoro__button Pomodoro__button--main${!state.activeTask ? " Pomodoro__button--disabled" : ""}`}
								disabled={!state.activeTask}
								onClick={startTimer}
								title="Pause pomodoro timer"
							>
								<svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
							</button>
					}
					<div className="Pomodoro__secondaries">
						{/* <button
							className="Pomodoro__button Pomodoro__button--secondary"
							onClick={resetTimer}
							title="Reset all"
						>
							<svg viewBox="0 0 24 24"><path d="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z"></path></svg>
						</button> */}
						<button
							className={`Pomodoro__button Pomodoro__button--secondary${!state.started ? " Pomodoro__button--disabled" : ""}`}
							disabled={!state.started}
							onClick={stopTimer}
							title="Stop pomodoro timer"
						>
							<svg viewBox="0 0 24 24"><path d="M18,18H6V6H18V18Z"></path></svg>
						</button>
						<button
							className={`Pomodoro__button Pomodoro__button--secondary${!state.started ? " Pomodoro__button--disabled" : ""}`}
							disabled={!state.started}
							onClick={skip}
							title={`Skip ${state.type === "task" ? "work and start break" : "break and start working"}`}
						>
							<svg viewBox="0 0 24 24"><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12"></path></svg>
						</button>
					</div>
				</div>
				<p className="Pomodoro__count">
					Pomodoro:&nbsp;
					<span>#{state.pomodoros}</span>
				</p>
			</div>
		</div>
	);
}

function DisplayTime({time}){
	var {hours, minutes, seconds} = time;
	
	return (
		<p className={`Pomodoro__time`}>
			<span className={`Pomodoro__time--hours`}>{hours}</span>
			<span className={`Pomodoro__time--separator`}>:</span>
			<span className={`Pomodoro__time--minutes`}>{minutes}</span>
			<span className={`Pomodoro__time--separator`}>.</span>
			<span className={`Pomodoro__time--seconds`}>{seconds}</span>
		</p>
	);
}

function convertTime(duration, timeInSeconds){
	var seconds = duration * 60 - timeInSeconds;
	var h = Math.floor(seconds / 60 / 60);
	var m = Math.floor(seconds / 60) - (h * 60);
	var s = seconds % 60;
	return {hours: h, minutes: ("0" + m).slice(-2), seconds: ("0" + s).slice(-2)};
}

var parseString = (string, value) => string.replace("#", value);

export default Pomodoro;