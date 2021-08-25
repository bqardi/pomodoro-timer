import { useRef, useState } from "react";

function useTimer(){
	var [running, setRunning] = useState(false);
	var [time, setTime] = useState(0);

	var timerRef = useRef();
	var startedAtRef = useRef(0);
	var timeDiffRef = useRef(0);

	function stop(){
		clearTimeout(timerRef.current);
		setRunning(false);
		startedAtRef.current = 0;
		timeDiffRef.current = 0;
	}
	function start(){
		stop();
		setRunning(true);
		setTime(0);
		startedAtRef.current = new Date().getTime();
		timerRef.current = setInterval(() => {
			setTime(prev => ++prev);
			timeDiffRef.current = 0;
		}, 1000 - timeDiffRef.current);
	}
	function pause(){
		timeDiffRef.current = new Date().getTime() - startedAtRef.current;
		startedAtRef.current = 0;
		clearTimeout(timerRef.current);
	}

	return {
		running, start, stop, pause, time
	};
}

export default useTimer;