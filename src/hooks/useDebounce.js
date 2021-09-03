import { useRef } from "react";

function useDebounce(timeout = 300){
	var timerRef = useRef();
	
	function debounce(callback){
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(callback, timeout);
	}

	return debounce;
}

export default useDebounce;