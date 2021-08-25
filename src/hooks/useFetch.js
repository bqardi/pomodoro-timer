import axios from "axios";
import { useEffect, useState } from "react";

const BRIDGE_IP = "192.168.8.100";
const USERNAME = "dIGh1wcvRpTmikzdRTySDt46Tq3NFvtaa8ZnX3sd";
const LAMP_ID = "13";

function useFetch(){
	var [data, setData] = useState({});

	useEffect(() => {
		getData();
	}, []);

	async function getData(){
		try {
			const result = await axios.get(`https://${BRIDGE_IP}/api/${USERNAME}/lights/${LAMP_ID}`);
			setData(result.data.state);
		} catch (error) {
			console.log("There was a GET error. No lamp is connected!", error);
		}
	}

	async function control(options){
		try {
			await axios.put(`https://${BRIDGE_IP}/api/${USERNAME}/lights/${LAMP_ID}/state`, options);
			getData();
		} catch (error) {
			console.log("There was a PUT error. No lamp is connected!", error);
		}
	}

	return {
		data,
		control
	};
}

export default useFetch;