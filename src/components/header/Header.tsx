import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../button/Button';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__body}>
				<div className={styles.logo}>
					<Image src={'/logo.png'} height={35} width={39} alt='logo' />
					MenuMastermind
				</div>

				<nav className={styles.nav}>
					<Link href={'/'} className={styles.nav__link}>
						Articles
					</Link>
					<Link href={'/'} className={styles.nav__link}>
						Sign up
					</Link>
					<Link href={'/'} className={styles.nav__link}>
						<Button>
							Sign in
							{/* <div className={styles.signIn}>
								<span>Sir Kotelokjkhfbdkjvhreb</span>
								<Image src={'/avatar.png'} height={30} width={30} alt='avatar' />
							</div> */}
						</Button>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
