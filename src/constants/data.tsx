import images from "@/constants/images";

export const categories = [
	{
		label: "Appliances & Electronics",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Jewelry & Accessories",
		value: "electronics",
		dropdown: " Gold, Silver, Diamond",
	},
	{
		label: "Bags & Luggage",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Home & Kitchen",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Fashion and Clothing",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Sports and Outdoors",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Beauty & Health",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Automotive",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Business, Industry & Service",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Tools & Home Improvement",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Toys & Games",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Office & School Supplies",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Arts, Crafts & Sewing",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Health & Household",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Patio, Lawn & Garden",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Baby & Maternity",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Pet Supplies",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Musical Instruments",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
	{
		label: "Books",
		value: "electronics",
		dropdown: [{ label: "Electronics", value: "electronics" }],
	},
];
export const helpList: any = [];

export const locations = [
	{
		updatedAt: "2025-03-30T22:05:11.346Z",
		createdAt: "2025-03-30T22:05:11.334Z",
		ttl: 1743378311,
		businessName: "Enugu",
		address: "Trans-Ekulu, Enugu, Nigeria",
		id: "ChIJN4pebgGjRBARTkRbW_C-orM",
		lat: 6.4856943,
		long: 7.4868283,
	},
];

export const items = [
	{
		_id: "67450291da5924906013d498",
		vendorId: "6744741577b0de87ce7fef48",
		name: "Estate Market",
		categories: ["category 1", "category 2", "category 3"],
		description: "some description",
		address: "20 Remmington Drive, Ottawa",
		business_type: "products",
		products_services: [],
		noOfLikes: 0,
		location: {
			coordinates: [0, 0],
			type: "Point",
		},
		total_ratings: 0,
		visibility: true,
		total_reviews: 0,
		reviews: [],
		createdAt: "2024-11-25T23:04:49.474Z",
		plan: "67450291da5924906013d49c",
		business_profile_picture:
			"https://tse4.mm.bing.net/th?id=OIP.v0k8EPA6XrsIV7kRzVfLJQHaLH&w=474&h=474&c=7",
		dist: {
			calculated: 0,
		},
		vendor_status: [
			{
				_id: "6744741577b0de87ce7fef48",
				status: "VERIFIED",
			},
		],
		minutes_away: 0,
	},
];

export const amazingDeals = [
	{
		name: "Beauty & Makeup",
		avatar: images.deals_image_1,
	},
	{
		name: "Valentine Special",
		avatar: images.deals_image_2,
	},
	{
		name: "Easter Hunts",
		avatar: images.deals_image_3,
	},
	{
		name: "Custom Portraits",
		avatar: images.deals_image_4,
	},
	{
		name: "Video Games",
		avatar: images.deals_image_5,
	},
];

export const faqs = [
	{
		trigger: "What is Bundo?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
	{
		trigger: "What kind of businesses can use Bundo?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
	{
		trigger: "Must I have a CAC document to use Bundo?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
	{
		trigger: "What kind of products can I buy on Bundo?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
	{
		trigger: "Is Bundo free to use?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
	{
		trigger: "How can I join the team?",
		body1:
			"Bundo is a retail & ecommerce technology company simplifying retail by bridging the gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources",
	},
];
