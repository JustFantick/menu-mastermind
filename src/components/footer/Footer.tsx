import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__body}>
				<div className={styles.footerLeft}>© 2024 MenuMastermind</div>
				<ul className={styles.footerRight}>
					<li>Legal Terms</li>
					<li>Privacy policy</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
