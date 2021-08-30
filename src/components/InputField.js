import { useState } from "react";
import "./InputField.scss";

function InputField({label, name, type="text"}){
	var [value, setValue] = useState("");
	
	return (
		<div className="InputField">
			<label className="InputField__label">{label}</label>
			<input
				className="InputField__input"
				type={type}
				name={name}
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	);
}

export default InputField;