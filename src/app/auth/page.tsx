'use client';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import styles from './auth.module.css';
import type { TProduct } from 'types';
import { Card, CategoryTabs, StoreHeader } from 'components';
import { getProducts, getStores } from 'app/api/';
import { FaAnglesUp } from 'react-icons/fa6';

export default function Auth() {
  const { stores, setStores,
    //  fetchStores, 
    products, setProducts } = useStore();
  const [active, setActive] = useState('Todos');
  const fetchProducts = async (storeId: string) => {
    setProducts(await getProducts(storeId));
  };

  const fetchStores = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchStores()
  }, []);

  const categories: { [categoryName: string]: TProduct[] } = products.reduce(
    (grouped: { [categoryName: string]: TProduct[] }, product: TProduct) => {
      const categoryName: string = product.category.name;
      grouped[categoryName] = grouped[categoryName] || [];
      grouped[categoryName].push(product);
      grouped.Todos = grouped.Todos || [];
      grouped.Todos.push(product);
      return grouped;
    },
    {}
  );

  return (
    <div className={styles.wrapper}>
      <StoreHeader stores={stores} fetchProducts={fetchProducts} />
      <div className={styles.menu}>
        <CategoryTabs active={active} categories={categories} setActive={setActive} />
        <div className={styles.cards}>
          {products.length > 0 ? categories[active].map((item) => (
            <Card fetchProducts={() => fetchProducts(stores[0].uuid)} key={item.uuid} item={item} />
          )) : <p className={styles.advice}> <FaAnglesUp /> Da click en una tienda para cargar los productos </p>}
        </div>
      </div>
    </div>
  );
}
