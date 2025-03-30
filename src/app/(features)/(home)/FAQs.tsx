"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/data";
import { cn } from "@/lib/utils";

const FAQ = () => {
	return (
		<>
			<h1 className="text-center mb-2 text-foreground-variant-100 leading-[1.2] max-sm:px-1">
				Frequently Asked{" "}
				<span className="font-semibold text-foreground-variant">Questions</span>
			</h1>

			<p className="max-sm:px-2 font-light max-w-[45ch] mx-auto text-base text-center">
				Need help? Check out these answers to questions you might have about
				Bundo.{" "}
				<span className="font-semibold text-foreground-variant-100">
					Or send an email to help@bundo.app
				</span>
			</p>

			<div className="faq mx-auto mt-8 w-[90%] max-w-[560px] self-center max-sm:px-1">
				{faqs.map((item, idx) => (
					<Accordion
						type="single"
						collapsible
						className="w-full py-3.5"
						key={idx}
					>
						<AccordionItem
							value={`item-${idx}`}
							className={cn(
								"border-[#8893857f]",
								idx === faqs.length - 1 && "border-none"
							)}
						>
							<AccordionTrigger className="font-medium text-base break-words text-left sm:w-full">
								{item?.trigger}
							</AccordionTrigger>
							<AccordionContent>
								<p className="max-w-[120ch] pr-2">{item.body1}</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</>
	);
};

export default FAQ;
