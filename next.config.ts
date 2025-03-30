/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["tse4.mm.bing.net", "maps.googleapis.com"],
	},
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},

	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.(".svg")
		);

		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}

		config.module.rules.push(
			{
				test: /\.svg$/i,
				resourceQuery: /url/,
				type: "asset/resource",
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: [/url/] },
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							svgo: true,
							svgoConfig: {
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeViewBox: false,
											},
										},
									},
								],
							},
						},
					},
				],
			}
		);

		return config;
	},
};

export default nextConfig;
