import { Instagram, Twitter, Facebook, LinkedIn } from "./icons";

export const footerLinks = [
	{
		name: "Company",
		dropdown: [
			{
				link: "About us",
				href: "/",
				tag: "about",
			},
			{
				link: "Careers",
				href: "/",
				tag: "career",
			},
			{
				link: "Community",
				href: "/",
				tag: "community",
			},
		],
	},
	{
		name: "Contact",
		dropdown: [
			{
				text: "Lagos, Nigeria",
				tag: "text",
			},
			{
				link: "hello@bundo.app",
				href: "mailto:hello@bundo.appg",
				tag: "email",
			},
			{
				link: "info@bundo.app",
				href: "mailto:info@bundo.app",
				tag: "email",
			},
		],
	},
	{
		name: "Support",
		dropdown: [
			{
				link: "FAQs",
				href: "/",
				tag: "faqs",
			},
			{
				link: "support@bundo.app",
				href: "mailto:support@bundo.appg",
				tag: "email",
			},
			{
				link: "help@bundo.app",
				href: "mailto:help@bundo.app",
				tag: "email",
			},
		],
	},

	{
		name: "Legal",
		dropdown: [
			{
				link: "Privacy Policy",
				href: "#",
				tag: "policy",
			},
			{
				link: "Terms of use",
				href: "#",
				tag: "terms",
			},
			{
				link: "Vendor Agreement",
				href: "#",
				tag: "agreement",
			},
		],
	},
];

export const socials = [
	{
		label: "Instagram",
		icon: Instagram,
		href: "#",
		tag: "instagram",
	},

	{
		label: "Twitter",
		icon: Twitter,
		href: "#",
		tag: "twitter",
	},

	{
		label: "Facebook",
		icon: Facebook,
		href: "#",
		tag: "facebook",
	},

	{
		label: "LinkedIn",
		icon: LinkedIn,
		href: "#",
		tag: "linkedIn",
	},
];
