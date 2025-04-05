import createNextIntlPlugin from "next-intl/plugin";

if (!createNextIntlPlugin) {
	throw new Error(
		"Failed to import createNextIntlPlugin from next-intl/plugin"
	);
}

const withNextIntl = createNextIntlPlugin();

if (!withNextIntl) {
	throw new Error("createNextIntlPlugin did not return a function");
}

const nextConfig = {
	distDir: ".next",
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "163.47.146.233",
				port: "3010",
				pathname: "/her-power-api/attachments/**",
			},
		],
		// domains: ["www.drug-international.com"],
		unoptimized: true,
	},
};

export default withNextIntl(nextConfig);
