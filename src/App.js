import { GlobalProvider } from "./contexts/GlobalContext";
import "./App.scss";
import useFetch from "./hooks/useFetch";
import Pomodoro from "./components/Pomodoro";
import { useEffect } from "react";

function App() {
	var {data, control} = useFetch();

	useEffect(() => {
		if (data.hasOwnProperty("on")) {
			console.log("Enable Philips HUE functionality");
		}
	}, [data]);
	
	return (
		<GlobalProvider value={{data, control}}>
			<Pomodoro />
		</GlobalProvider>
	);
}

export default App;
