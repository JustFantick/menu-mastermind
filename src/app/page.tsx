import Searchbar from '@/components/searchbar/Searchbar';
import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
	return (
		<main className={styles.home}>
			<section className={styles.home__section}>
				<Image src={'/home-bg_2.png'} alt='home-bg' layout='fill' objectFit='cover' className={styles.sectionBackground} />
				<div className={styles.overlay}></div>

				<Searchbar />
			</section>
		</main>
	);
}
