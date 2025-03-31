"use client";

import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import AddAddress from "./AddAddress";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import { Close, LinkIcon, PlusIcon, SearchIcon } from "@/constants/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { showToast } from "@/lib/utils";
import { CoordinatesType, useLocation } from "@/context/LocationContext";
import { v4 as uuidv4 } from "uuid";
import { createVendorLocation } from "@/server/actions";
import { animateFn, slideinVariant } from "@/lib/animate";
import { motion } from "framer-motion";
import { AddBusinessSchema } from "@/schema/validation";
import CustomIcon from "@/components/reuseables/CustomIcon";
import { useRouter } from "next/navigation";

const AddBusiness = ({ closeModal }: { closeModal: () => void }) => {
	const [showModalContent, setShowModalContent] = useState<"form" | "address">(
		"form"
	);
	const { addressObject, setAddressObject } = useLocation();

	return (
		<motion.div
			style={{ zIndex: 9999 }}
			className="fixed inset-0 block h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm"
		>
			<motion.div
				{...animateFn(slideinVariant)}
				className="flex-column remove-scrollbar inset-0 h-svh w-dvw bg-background md:inset-[50%] md:rounded-xl overflow-x-clip overflow-y-auto md:max-h-[540px] md:min-h-[200px] md:max-w-lg 
			 fixed md:top-[50%] md:left-[50%] z-[9999] md:translate-x-[-50%] md:translate-y-[-50%]
				"
				onClick={(e) => e.stopPropagation()}
				style={{ zIndex: 999 }}
			>
				<div className="py-3 px-4 shadow-xs flex border-b border-border justify-end">
					<CustomIcon
						action={() =>
							showModalContent === "address"
								? setShowModalContent("form")
								: closeModal()
						}
						icon={Close}
						iconColor={"variant"}
						className=""
					/>
				</div>

				<div className="flex-column gap-4 py-3 px-4">
					{showModalContent === "form" ? (
						<>
							<h2 className="mt-2">Add New Business</h2>

							<div className="px-1">
								<AddNewBusinessForm
									addressObject={addressObject}
									setOpenAddressContent={() => setShowModalContent("address")}
									closeModal={() => closeModal()}
								/>
							</div>
						</>
					) : (
						<AddAddress
							onSetAddress={(value: CoordinatesType) => setAddressObject(value)}
							closeModalContent={() => setShowModalContent("form")}
						/>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default AddBusiness;

const AddNewBusinessForm = ({
	addressObject,
	setOpenAddressContent,
	closeModal,
}: {
	addressObject: CoordinatesType | null;
	setOpenAddressContent: any;
	closeModal: () => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	// @ts-ignore
	const onSubmit = async (values: any) => {
		const data = {
			id: uuidv4(),
			lat: addressObject?.lat!,
			long: addressObject?.lng!,
			businessName: values.business_name,
			businessProfilePicture: values.business_picture,
			address: addressObject?.name!,
		};

		setIsLoading(true);
		try {
			const res = await createVendorLocation(data);

			if (!res?.status) throw new Error(res?.message || "An error occurred");

			showToast("success", "Location created successfully");
			closeModal();
			router.push("/explore");
		} catch (error: any) {
			showToast("error", "Error creating location");
		} finally {
			setIsLoading(false);
		}
	};

	const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
		useFormik({
			initialValues: {
				address: addressObject?.name || "",
				business_name: "",
				business_picture: "",
			},
			validationSchema: AddBusinessSchema,
			onSubmit,
		});

	return (
		<FormWrapper
			formWrapperStyles="gap-6"
			buttonLabel={"Save Business"}
			btnStyles="bg-secondary-200"
			onSubmit={handleSubmit}
			isSubmitting={isLoading}
		>
			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="address"
				label="Enter Address"
				iconSrc={SearchIcon}
				field={{
					value: values.address,
					readOnly: values.address ? false : true,
					placeholder: "Click on Add Address below to add a new address",
				}}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>

			<div className="flex-column gap-4">
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					name="business_name"
					label="Business Name"
					field={{
						value: values.business_name,
					}}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>

				<CustomButton
					onClick={() => setOpenAddressContent()}
					icon={PlusIcon}
					title={values.address ? "Change Address" : "Add Address"}
					className="bg-secondary-200 w-full"
				/>
			</div>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="business_picture"
				label="Business Profile Picture"
				field={{
					value: values.business_picture,
					placeholder: "Image Link",
				}}
				iconSrc={LinkIcon}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
		</FormWrapper>
	);
};
