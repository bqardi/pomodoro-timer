import { useEffect } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import useTimer from "./useTimer";
import useLamp from "./useLamp";

function usePomodoro(){
	var {state, dispatch, ACTION_TYPES, pomodoroSettings} = useGlobalContext();
	var {time, start, pause, resume, stop} = useTimer();
	var {control} = useLamp();

	function startTimer(){
		if (state.paused) {
			resumeTimer();
			return;
		}
		start();
		dispatch({type: ACTION_TYPES.TIMER.START});
		control(pomodoroSettings[state.type].start);
	}
	function pauseTimer(){
		pause();
		dispatch({type: ACTION_TYPES.TIMER.PAUSE});
		control(pomodoroSettings[state.type].paused);
	}
	function resumeTimer(){
		resume();
		dispatch({type: ACTION_TYPES.TIMER.RESUME});
		control(pomodoroSettings[state.type].start);
	}
	function stopTimer(){
		stop();
		dispatch({type: ACTION_TYPES.TIMER.STOP});
		control(pomodoroSettings[state.type].end);
	}
	function resetTimer(){
		stop();
		dispatch({type: ACTION_TYPES.TIMER.RESET});
		control({on: false});
	}
	function skip(){
		pomodoroEnd();
	}
	function pomodoroEnd(){
		stopTimer();
		dispatch({type: ACTION_TYPES.END_POMODOROS});
	}
	
	useEffect(() => {
		if (time >= pomodoroSettings[state.type].duration * 60) {
			pomodoroEnd();
		}
		// eslint-disable-next-line
	}, [time]);
	useEffect(() => {
		if (state.type !== "task") {
			startTimer();
		}
		// eslint-disable-next-line
	}, [state.type]);

	return {
		startTimer, pauseTimer, resumeTimer, skip, stopTimer, resetTimer,
		time, settings: pomodoroSettings[state.type]
	};
}

export default usePomodoro;