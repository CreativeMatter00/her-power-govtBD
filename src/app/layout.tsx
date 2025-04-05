import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

import { CookiesProvider } from "next-client-cookies/server";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};
export const metadata: Metadata = {
  title: "Her Power",
  description: "Her Power is a government initiative empowering women through technology, skill development, and entrepreneurship, fostering digital inclusion and economic growth.",
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
	return <html>
		<body>
			<CookiesProvider>{children}</CookiesProvider>
		</body>
	</html>
}
