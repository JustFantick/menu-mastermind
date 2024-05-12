import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Header from '@/components/header/Header';
import './globals.scss';

const font = Nunito_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Menu mastermind',
	description: 'Recipes for everyone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className} id='body'>
				<Header></Header>
				<div className='wrapper'>{children}</div>
				<footer></footer>
			</body>
		</html>
	);
}
