import axios from "axios";
import { useEffect, useState } from "react";
import useGlobalContext from "../contexts/GlobalContext";

const BRIDGE_IP = "192.168.8.100";
const USERNAME = "IGRYQ4tZgqndWROm9nQI6MlLCAnoiuDXm016DBQ9";
const LAMP_ID = "9";

function useLamp(){
	var {lamp} = useGlobalContext();
	var [data, setData] = useState({});

	async function getData(){
		if (!lamp) {
			setData({on: false});
			return;
		};
		try {
			const result = await axios.get(`https://${BRIDGE_IP}/api/${USERNAME}/lights/${LAMP_ID}`);
			setData(result.data.state);
		} catch (error) {
			console.log("There was a GET error. No lamp is connected!");
		}
	}

	async function control(options){
		if (!options) return;
		if (!data.hasOwnProperty("on")) return;
		try {
			await axios.put(`https://${BRIDGE_IP}/api/${USERNAME}/lights/${LAMP_ID}/state`, options);
			getData();
		} catch (error) {
			console.log("There was a PUT error. No lamp is connected!", error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return {
		data,
		control
	};
}

export default useLamp;