import { useEffect, useState } from 'react';
import type { TStore } from 'types';
import styles from './store-selector.module.css';

const StoreSelector = ({
  stores,
  fetchProducts,
}: { stores: TStore[]; fetchProducts: (id: string) => void }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (stores.length > 0) {
      fetchProducts(stores[0].uuid);
    }
  }, [stores])

  return (
    <div className={styles.tabs}>
      {stores.length > 0 &&
        stores.map((item: TStore, i: number) => (
          <div
            key={item.uuid}
            className={`${styles.tab} ${active === i ? styles.active : ''}`}
            onClick={() => {
              setActive(i);
              fetchProducts(item.uuid);
            }}
          >
            {item.name}
          </div>
        ))}
    </div>
  );
};

export default StoreSelector;
