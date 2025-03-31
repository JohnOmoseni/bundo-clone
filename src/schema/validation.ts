import * as yup from "yup";

export const SignInSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const AddBusinessSchema = yup.object().shape({
	address: yup.string().required("Address is required"),
	business_name: yup.string().required("Business Name is required"),
	business_picture: yup.string(),
});
