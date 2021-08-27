import { GlobalProvider } from "./contexts/GlobalContext";
import "./App.scss";
import useGlobalReducer from "./hooks/useGlobalReducer";
import PomodoroTimer from "./views/PomodoroTimer";
import {Router} from "@reach/router";

// Define "duration" in minutes:
const pomodoroSettings = {
	task: {
		title: `Start working`,
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
		title: `Take a # minute break`,
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
		title: `Take a long # minute break`,
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
			</Router>
		</GlobalProvider>
	);
}

export default App;
