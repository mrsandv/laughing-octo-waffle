import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
	title: 'Parrot Challenge',
	description:
		'El control total de tu restaurante con el software punto de venta: Parrot, mejora tu operación, reduce gastos, elimina pasos y gana tiempo.',
};

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-roboto',
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<ToastContainer theme="dark" transition={Slide} />
				{children}
			</body>
		</html>
	);
}
