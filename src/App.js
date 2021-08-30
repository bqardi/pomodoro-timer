import { GlobalProvider } from "./contexts/GlobalContext";
import "./App.scss";
import useGlobalReducer from "./hooks/useGlobalReducer";
import PomodoroTimer from "./views/PomodoroTimer";
import {Router} from "@reach/router";
import Settings from "./views/Settings";
import BottomNavigation from "./components/BottomNavigation";
import useLocalStorage from "./hooks/useLocalStorage";

// Define "duration" in minutes:
const pomodoroSettings = {
	task: {
		title: `Working on "#" -task.`,
		duration: 0.1,
		start: {
			on: false,
			sat: 254,
			bri: 100,
		},
		paused: {
			on: true,
			sat: 254,
			bri: 100,
		},
		end: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 20000
		},
	},
	break: {
		title: `Taking a break from "#" -task.`,
		duration: 0.05,
		start: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 20000
		},
		paused: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 10000
		},
		end: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 0
		}
	},
	longBreak: {
		title: `Taking a long break from "#" -task.`,
		duration: 0.1,
		start: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 46000
		},
		paused: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 10000
		},
		end: {
			on: true,
			sat: 254,
			bri: 100,
			hue: 0
		}
	}
}

function App() {
	var {state, dispatch, ACTION_TYPES} = useGlobalReducer();
	var [moveCompleted, setMoveCompleted] = useLocalStorage("moveCompleted", true);
	var [autostartBreak, setAutostartBreak] = useLocalStorage("autostartBreak", false);
	var [lamp, setLamp] = useLocalStorage("lamp", false);
	
	return (
		<GlobalProvider value={{
			state, dispatch, ACTION_TYPES,
			pomodoroSettings,
			moveCompleted, setMoveCompleted,
			autostartBreak, setAutostartBreak,
			lamp, setLamp
		}}>
			<Router>
				<PomodoroTimer path="/" />
				<Settings path="/settings" />
			</Router>
			<BottomNavigation />
		</GlobalProvider>
	);
}

export default App;
