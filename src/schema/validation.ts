import * as yup from "yup";

export const AddBusinessSchema = yup.object().shape({
	address: yup.string().required("Address is required"),
	business_name: yup.string().required("Business Name is required"),
	business_picture: yup.string(),
});
