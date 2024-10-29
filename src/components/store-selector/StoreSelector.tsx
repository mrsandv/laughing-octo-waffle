import { useState } from 'react';
import styles from './store-selector.module.css';
import type { TStore } from 'types';

const StoreHeader = ({ stores, fetchProducts }: any) => {
  const [active, setActive] = useState(0)
  return (
    <div className={styles.tabs}>
      {stores.length > 0 && stores.map((item: TStore, i: number) => (
        <div
          key={item.uuid}
          className={`${styles.tab} ${active === i ? styles.active : ''}`}
          onClick={() => {
            setActive(i)
            fetchProducts(item.uuid);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default StoreHeader;
