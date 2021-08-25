import { useEffect, useState } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import useTimer from "./useTimer";

const TIME_SETTINGS = [
	{
		name: "First",
		duration: 3,
		start: {
			on: false,
		},
		end: {
			on: true,
			hue: 0,
			sat: 254,
			bri: 100,
		},
		continuous: false
	},
	{
		name: "Second",
		duration: 3,
		start: {
			on: false
		},
		end: {
			on: true,
			hue: 10000
		},
		continuous: true
	},
	{
		name: "Third",
		duration: 3,
		end: {
			on: true,
			hue: 20000
		},
		continuous: false
	},
]

function usePomodoro(){
	var {control} = useGlobalContext();
	var {running, start, stop, pause, time} = useTimer();
	var [currIndex, setCurrIndex] = useState(0);
	var [started, setStarted] = useState(false);
	// var [isContinuous, setIsContinuous] = useState(false);

	function startTimer(){
		setStarted(true);
		start();
		if (TIME_SETTINGS[currIndex].start){
			control(TIME_SETTINGS[currIndex].start);
		}
	}
	function pauseTimer(){
		var accDuration = accumulatedDuration(currIndex, TIME_SETTINGS[currIndex].duration);
		console.log(time, accDuration)
		if (time >= accDuration) {
			pause();
			setStarted(false);
			setCurrIndex(prev => nextIndex(prev));
		}
		if (TIME_SETTINGS[currIndex].end){
			control(TIME_SETTINGS[currIndex].end);
		}
	}
	function stopTimer(){
		stop();
		setCurrIndex(0);
		setStarted(false);
		control({on: false});
	}
	function nextIndex(current){
		var i = current + 1;
		if (i >= TIME_SETTINGS.length) {
			i = 0;
		}
		return i;
	}
	function accumulatedDuration(index, duration){
		var accDur = 0;
		if (index + 1 < TIME_SETTINGS.length && TIME_SETTINGS[index].continuous) {
			accDur = accumulatedDuration(index + 1, TIME_SETTINGS[index + 1].duration);
		}
		return duration + accDur;
	}

	// useEffect(() => {
	// 	if (isContinuous) {
	// 		var accDuration = accumulatedDuration(currIndex, TIME_SETTINGS[currIndex].duration);
	// 		if (accDuration === TIME_SETTINGS[currIndex].duration) {
	// 			startTimer();
	// 		}
	// 		setIsContinuous(false);
	// 	}
	// 	// eslint-disable-next-line
	// }, [isContinuous]);

	useEffect(() => {
		if (time >= TIME_SETTINGS[currIndex].duration) {
			pauseTimer();
		}
	}, [time]);

	return {
		startTimer, stopTimer, pauseTimer,
		running, started, time
	};
}

export default usePomodoro;