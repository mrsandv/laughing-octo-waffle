'use client';
import Link from 'next/link';
import { FaHouseChimney } from 'react-icons/fa6';
import styles from './not-found.module.css';

const NotFound = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<img src="/logo.webp" alt="Parrot logo" className={styles.logo} />
				<p>Ups! Parece que estas perdido</p>
				<Link className={styles.link} href="/">
					<FaHouseChimney /> Ir al inicio
				</Link>
			</div>
			<div className={styles.cover} />
		</div>
	);
};

export default NotFound;
