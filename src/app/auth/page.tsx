'use client'
import { useEffect, useState } from 'react';
import { useStore } from 'hooks/store';
import styles from './auth.module.css'
import type { TProduct } from 'types';
import { Card } from 'components';
import { getProducts } from 'app/api/'

export default function Auth() {
  const { stores, fetchStores, products, setProducts } = useStore();
  const [active, setActive] = useState('Todos');

  const fetchProducts = async (storeId: string) => {
    setProducts(await getProducts(storeId))
  }

  useEffect(() => {
    fetchStores()
  }, [])

  const categories: { [categoryName: string]: TProduct[] } = products.reduce((grouped: { [categoryName: string]: TProduct[] }, product: TProduct) => {
    const categoryName: string = product.category.name;
    grouped[categoryName] = grouped[categoryName] || [];
    grouped[categoryName].push(product);
    grouped.Todos = grouped.Todos || [];
    grouped.Todos.push(product);
    return grouped;
  }, {});

  const sortCats = Object.keys(categories).sort((a, b) => categories[b].length - categories[a].length)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {
          stores.map((item: any) => <p key={item.uuid} className={styles.storeBar} onClick={() => {
            fetchProducts(item.uuid)
          }}>{item.name}</p>)
        }
      </div>
      <div className={styles.menu}>
        <div className={styles.tabs}>
          <p className={styles.title}>Categorias</p>
          {
            sortCats.map((key) => <div className={`${styles.tab} ${active === key ? styles.active : ''}`} onClick={() => setActive(key)} key={key}>{key} <span className={`${styles.counter} ${active === key ? styles.activeC : ''}`}>{categories[key].length}</span></div>)
          }
        </div>
        <div className={styles.cards}>
          {
            categories[active].map(item => < Card fetchProducts={() => fetchProducts(stores[0].uuid)} key={item.uuid} item={item} />)
          }
        </div>
      </div>
    </div>
  )
}

