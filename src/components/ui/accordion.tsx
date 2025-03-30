"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("border-b ", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	iconComponent,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
	iconComponent?: React.ReactNode;
}) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					// "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
					"flex flex-1 items-center justify-between gap-4 py-4 text-sm font-medium transition-all hover:underline text-left",

					"[&[data-state=open]>div>svg:first-of-type]:block [&[data-state=open]>div>svg:last-of-type]:hidden",
					"[&[data-state=closed]>div>svg:first-of-type]:hidden [&[data-state=closed]>div>svg:last-of-type]:block",
					className
				)}
				{...props}
			>
				{children}

				{iconComponent ? (
					iconComponent
				) : (
					<div className="icon-div shrink-0 bg-secondary rounded-full text-white ">
						<ChevronUpIcon className="size-5 transition-pointer-events-none transition-transform duration-200" />
						<ChevronDownIcon className="size-5 transition-pointer-events-none transition-transform duration-200" />
					</div>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			{...props}
		>
			<div className={cn("pt-0 pb-4", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
