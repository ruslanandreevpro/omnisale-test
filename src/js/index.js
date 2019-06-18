import "./import/modules.js";
import "./import/components.js";

let isValid = false;
let isFormValid = false;

const formControls = {
	phone: {
		value: "",
		type: "phone",
		error: true,
		touched: false,
		validation: {
			required: true,
			phone: true
		}
	},
	password: {
		value: "",
		type: "password",
		error: true,
		touched: false,
		validation: {
			required: true,
			minLength: 5
		}
	}
};

const phoneIsValid = phone => {
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
};

const validateControls = (value, validation, touched) => {
	if (!validation) {
		return true;
	}

	isValid = true;

	if (validation.required) {
		isValid = value.trim() !== "" && isValid && touched;
	}

	if (validation.phone) {
		isValid = phoneIsValid(value) && isValid && touched;
	}

	if (validation.minLength) {
		isValid = value.length >= validation.minLength && isValid && touched;
	}
	return isValid;
};

const handleChange = (event, controlName) => {
	const control = { ...formControls[controlName] };
	control.value = event.target.value;
	control.touched = true;
	control.error = validateControls(control.value, control.validation, control.touched);
	formControls[controlName] = control;
	if (formControls[controlName].error) {
	    document.getElementById(formControls[controlName].type).className = "success";
        document.getElementById("success-" + formControls[controlName].type).style.display = "block";
        document.getElementById("error-" + formControls[controlName].type).style.display = "none";
	} else {
		document.getElementById(formControls[controlName].type).className = "error";
        document.getElementById("error-" + formControls[controlName].type).style.display = "flex";
        document.getElementById("success-" + formControls[controlName].type).style.display = "none";
	}
	let isFormValid = true;
	Object.keys(formControls).forEach(name => {
		isFormValid = formControls[name].error && isFormValid && formControls[name].touched;
	});
	document.getElementById("submit_btn").disabled = !isFormValid;
	return isFormValid;
};

window.onload = function () {
	document.getElementById("phone").focus();
};

document.getElementById("phone").addEventListener("input", event => handleChange(event, "phone"));
document.getElementById("password").addEventListener("input", event => handleChange(event, "password"));