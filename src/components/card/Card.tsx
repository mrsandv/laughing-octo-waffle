import { changeProductStatus } from 'app/api';
import { Switch } from 'components/';
import { toast } from 'react-toastify';
import type { TProduct } from 'types';
import styles from './card.module.css';

const Card = ({
	item,
	fetchProducts,
}: { item: TProduct; fetchProducts: () => void }) => {
	const handleStatus = async ({ id, status }: { id: string; status: boolean }) => {
		const { success, message } = await changeProductStatus(id, status);
		if (success) {
			fetchProducts();
			toast.success(message);
		} else {
			toast.error(message);
		}
	};

	return (
		<div className={`${styles.card} ${item.availability === 'AVAILABLE' ? '' : styles.disabled}`}>
			<img src={item.imageUrl} alt={item.name} className={styles.picture} />
			<div className={styles.infoWrapp}>
				<p className={styles.title}>{item.name}</p>
				<span className={styles.subtitle}>{item.category.name}</span>
				<div className={styles.row}>
					<p className={styles.bold}>{`$${item.price} MXN`}</p>
					<Switch
						onChange={() => {
							handleStatus({
								id: item.uuid,
								status: item.availability === 'AVAILABLE',
							});
						}}
						type="checkbox"
						checked={item.availability === 'AVAILABLE'}
					/>
				</div>
			</div>
		</div>
	);
}

export default Card;