/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					// Define how Turbo handles SVG files
					loaders: ["@svgr/webpack"],
					as: "*.js", // Treat the output as JavaScript (React components)
				},
			},
		},
	},

	webpack(config) {
		// Find the existing rule that handles image imports, including SVGs
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.(".svg")
		);

		if (fileLoaderRule) {
			// Exclude SVG files from the default file loader
			fileLoaderRule.exclude = /\.svg$/i;
		}

		// Add new rules for handling SVG files
		config.module.rules.push(
			// Rule for importing SVGs as URLs (e.g., `import svgUrl from './icon.svg?url'`)
			{
				test: /\.svg$/i,
				resourceQuery: /url/, // Matches `?url`
				type: "asset/resource", // Serves SVG as a URL
			},
			// Rule for importing SVGs as React components (default behavior)
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/, // Applies only when imported in JS/TS files
				resourceQuery: { not: [/url/] }, // Excludes `?url`
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							svgo: true,
							svgoConfig: {
								plugins: [{ removeViewBox: false }], // Keep the `viewBox` attribute
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
