"use client";

import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import { Close, PlusIcon, SearchIcon } from "@/constants/icons";
import { useFormik } from "formik";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CustomIcon from "@/components/reuseables/CustomIcon";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CoordinatesType } from "@/context/LocationContext";
import AddAddress from "./AddAddress";

const AddBusiness = ({
	openModal,
	closeModal,
}: {
	openModal: boolean;
	closeModal: () => void;
}) => {
	const [showModalContent, setShowModalContent] = useState<"form" | "address">(
		"form"
	);
	const [addressObject, setAddressObject] = useState<CoordinatesType | null>(
		null
	);
	// const { addressObject, setAddressObject } = useLocation();

	return (
		<AlertDialog open={openModal} onOpenChange={() => closeModal()}>
			<AlertDialogContent
				style={{ zIndex: 999 }}
				className="block remove-scrollbar h-svh rounded-none w-dvw !max-w-[100%] overflow-x-clip overflow-y-auto p-0 border-0"
			>
				<AlertDialogHeader>
					<AlertDialogTitle className="">
						<div className="py-3 px-4 shadow-xs flex border-b border-border justify-end">
							<CustomIcon
								action={() => closeModal()}
								icon={Close}
								iconColor={"variant"}
								className=""
							/>
						</div>
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="flex-column gap-4 py-6 px-4 md:px-5">
					{showModalContent === "form" ? (
						<>
							<h2>Add New Business</h2>

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
			</AlertDialogContent>
		</AlertDialog>
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
	// @ts-ignore
	const onSubmit = async (values: any) => {
		try {
			closeModal();
		} catch (error: any) {}
	};

	const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
		useFormik({
			initialValues: {
				address: "",
				business_name: "",
				business_address: "",
				business_picture: "",
			},
			validationSchema: "",
			onSubmit,
		});

	return (
		<FormWrapper
			formWrapperStyles="gap-6"
			buttonLabel={"Save Business"}
			btnStyles="bg-secondary-200"
			onSubmit={handleSubmit}
		>
			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="address"
				label="Enter Address"
				iconSrc={SearchIcon}
				field={{
					value: values.address,
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

				{addressObject ? (
					<div
						className={cn(
							"group w-full",
							errors?.["business_address"] && touched?.["business_address"]
								? "is-error flex-column gap-1"
								: ""
						)}
					>
						<Input
							name={"business_address"}
							value={addressObject?.label}
							readOnly
							className="!i-reset"
						/>

						<p className="mt-0.5 ml-0.5 transition-sm hidden text-xs font-semibold text-red-500 group-[.is-error]:block group-[.is-error]:animate-in">
							{errors?.["business_address"] as string}
						</p>
					</div>
				) : (
					<CustomButton
						onClick={() => setOpenAddressContent()}
						icon={PlusIcon}
						title="Add Address"
						className="bg-secondary-200 w-full"
					/>
				)}
			</div>

			<CustomFormField
				fieldType={FormFieldType.INPUT}
				name="business_picture"
				label="Business Profile Picture"
				field={{
					value: values.business_picture,
				}}
				iconSrc={""}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
		</FormWrapper>
	);
};
