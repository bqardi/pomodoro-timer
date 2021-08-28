import Pomodoro from "../components/Pomodoro";
import Todo from "../components/Todo";
import "./PomodoroTimer.scss"

function PomodoroTimer(){
	return (
		<main className="PomodoroTimer">
			<Pomodoro />
			<Todo />
		</main>
	);
}

export default PomodoroTimer;