import Link from 'next/link';
import styles from './topbar.module.css';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function TopBar() {

	const closeSession = () => {
		document.cookie =
			'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		sessionStorage.clear();
		toast.error('Se ha cerrado la sesión, seras dirigido al login');
		setTimeout(() => {
			window.location.href = '/login';
		}, 5000);
	};

	return (
		<div className={styles.wrapper}>
			<Link href="/auth">
				<img
					className={styles.logo}
					alt="Parrot logo"
					src="/logo.webp"
				/>
			</Link>
			<div className={styles.closeSession} onClick={closeSession}>
				<FaArrowRightFromBracket />
			</div>
		</div>
	);
}
