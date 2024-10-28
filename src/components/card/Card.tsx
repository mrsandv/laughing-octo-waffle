import Switch from 'components/switch';
import styles from './card.module.css';
import type { TProduct } from 'types';
import { changeProductStatus } from 'app/api';
import { toast } from 'react-toastify';


export default function Card({ item, fetchProducts }: { item: TProduct, fetchProducts: () => void }) {
  const handleStatus = async ({ id, status }: { id: string, status: boolean }) => {
    const { success, message } = await changeProductStatus(id, status);
    if (success) {
      fetchProducts();
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  return (
    <div className={styles.card}>
      <img src={item.imageUrl} alt={item.name} className={styles.picture} />
      <div className={styles.infoWrapp}>
        <p className={styles.title}>{item.name}</p>
        <span className={styles.subtitle}>{item.category.name}</span>
        <div className={styles.row}>
          <p className={styles.bold}>{`$${item.price} MXN`}</p>
          <Switch onChange={() => {
            handleStatus({
              id: item.uuid,
              status: item.availability === 'AVAILABLE',
            });
          }} type="checkbox" checked={item.availability === "AVAILABLE"} />
        </div>
      </div>
    </div>
  );
}