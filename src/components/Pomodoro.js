import usePomodoro from "../hooks/usePomodoro";
import "./Pomodoro.scss";

function Pomodoro(){
	var {started, startTimer, stopTimer, time} = usePomodoro();

	function secondsToTime(seconds){
		var h = Math.floor(seconds / 60 / 60);
		var m = Math.floor(seconds / 60) - (h * 60);
		var s = seconds % 60;
		return `${h}:${('0' + m).slice(-2)}.${('0' + s).slice(-2)}`;
	}
	
	return (
		<div className="Pomodoro">
			<div className="Pomodoro__buttons">
				<button className={`Pomodoro__button${started ? " Pomodoro__button--disabled" : ""}`} disabled={started} onClick={startTimer}>Start</button>
				<button className={`Pomodoro__button${!started ? " Pomodoro__button--disabled" : ""}`} disabled={!started} onClick={stopTimer}>Stop</button>
			</div>
			<p style={{fontSize: "5rem"}}>{secondsToTime(time)}</p>
		</div>
	);
}

export default Pomodoro;