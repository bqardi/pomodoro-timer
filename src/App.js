import { GlobalProvider } from "./contexts/GlobalContext";
import "./App.scss";
import useGlobalReducer from "./hooks/useGlobalReducer";
import PomodoroTimer from "./views/PomodoroTimer";
import {Router} from "@reach/router";
import Settings from "./views/Settings";
import BottomNavigation from "./components/BottomNavigation";

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
			on: true
		}
	},
	break: {
		title: `Taking a break from "#" -task.`,
		duration: 0.05,
		start: {
			on: true,
			hue: 20000
		},
		paused: {
			on: false
		},
		end: {
			on: true,
			hue: 0
		}
	},
	longBreak: {
		title: `Taking a long break from "#" -task.`,
		duration: 0.1,
		start: {
			on: true,
			hue: 46000
		},
		paused: {
			on: false
		},
		end: {
			on: true,
			hue: 0
		}
	}
}

function App() {
	var {state, dispatch, ACTION_TYPES} = useGlobalReducer();
	
	return (
		<GlobalProvider value={{state, dispatch, ACTION_TYPES, pomodoroSettings}}>
			<Router>
				<PomodoroTimer path="/" />
				<Settings path="/settings" />
			</Router>
			<BottomNavigation />
		</GlobalProvider>
	);
}

export default App;
