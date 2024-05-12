import Searchbar from '@/components/searchbar/Searchbar';
import styles from './page.module.scss';

export default function Home() {
	return (
		<main className={styles.home}>
			{/* <Image/> */}

			<Searchbar />
		</main>
	);
}
