import axios from "axios";
import useGlobalContext from "../contexts/GlobalContext";

// const BRIDGE_IP = "192.168.8.100";
// const USERNAME = "IGRYQ4tZgqndWROm9nQI6MlLCAnoiuDXm016DBQ9";
// const LAMP_ID = "9";

function useLamp(){
	var {lampOn, cookies} = useGlobalContext();

	async function getData(callback){
		if (!lampOn) return;
		try {
			const result = await axios.get(`https://${cookies.lampSettings.ip}/api/${cookies.lampSettings.username}/lights/${cookies.lampSettings.lampid}`);
			callback(result.data.state);
		} catch (error) {
			console.log("There was a GET error. No lamp is connected!");
		}
	}

	async function control(options){
		if (!lampOn || !options) return;
		try {
			await axios.put(`https://${cookies.lampSettings.ip}/api/${cookies.lampSettings.username}/lights/${cookies.lampSettings.lampid}/state`, options);
		} catch (error) {
			console.log("There was a PUT error. No lamp is connected!", error);
		}
	}

	return {
		getData,
		control
	};
}

export default useLamp;