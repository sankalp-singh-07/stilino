import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'easymde/dist/easymde.min.css';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({
	variable: '--font-inter-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Stilino',
	description: 'For The Foodies',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} font-sans antialiased`}>
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</body>
		</html>
	);
}
