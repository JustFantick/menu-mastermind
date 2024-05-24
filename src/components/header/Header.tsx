import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../button/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Header = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);

	const SignInButton = (
		<Link href={'/sign-in'} className={styles.nav__link}>
			<Button>Sign in</Button>
		</Link>
	);

	const ProfileButton = (
		<Link href={'/profile/profileData'} className={styles.nav__link}>
			<Button>
				<div className={styles.signIn}>
					<span>{session?.user.username}</span>
					<Image src={'/profile_placeholder.svg'} height={25} width={25} alt='profile' />
				</div>
			</Button>
		</Link>
	);

	return (
		<header className={styles.header}>
			<div className={styles.header__body}>
				<Link href={'/'} className={styles.nav__link}>
					<div className={styles.logo}>
						<Image src={'/logo.png'} height={35} width={39} alt='logo' />
						MenuMastermind
					</div>
				</Link>

				<nav className={styles.nav}>
					<Link href={'/articles'} className={styles.nav__link}>
						Articles
					</Link>
					{!session?.user && (
						<Link href={'/sign-up'} className={styles.nav__link}>
							Sign up
						</Link>
					)}

					{session?.user ? ProfileButton : SignInButton}
				</nav>
			</div>
		</header>
	);
};

export default Header;
