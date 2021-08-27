import { useRef, useState } from "react";

function useTimer(){
	var [time, setTime] = useState(0);

	var timerRef = useRef();

	function stop(){
		clearTimeout(timerRef.current);
		setTime(0);
	}
	function start(){
		stop();
		resume();
	}
	function pause(){
		clearInterval(timerRef.current);
	}
	function resume(){
		timerRef.current = setInterval(() => {
			setTime(prev => ++prev);
		}, 1000);
	}

	return {
		time, start, stop, pause, resume
	};
}

export default useTimer;