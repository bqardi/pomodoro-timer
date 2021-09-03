import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import "./InputField.scss";

function InputField({label, name, type="text", value="", onValue}){
	var [inputValue, setInputValue] = useState(value);
	var debounce = useDebounce();

	function updateValue(e){
		setInputValue(e.target.value);
		onValue && debounce(() => onValue(e.target.value));
	}
	
	return (
		<div className="InputField">
			<label className="InputField__label">{label}</label>
			<input
				className="InputField__input"
				type={type}
				name={name}
				value={inputValue}
				onChange={updateValue}
			/>
		</div>
	);
}

export default InputField;