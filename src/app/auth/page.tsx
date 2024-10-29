'use client';
import { getProducts, getStores } from 'app/api/';
import { Card, CategoryTabs, StoreSelector } from 'components';
import { useEffect, useState } from 'react';
import { FaAnglesUp } from 'react-icons/fa6';
import { useStore } from 'store';
import type { TProduct } from 'types';
import styles from './auth.module.css';
import { groupProducts } from 'helpers';

const Home = () => {
	const {
		stores,
		setStores,
		products,
		setProducts,
	} = useStore();
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
	};

	useEffect(() => {
		fetchStores();
	}, []);

	const categories = groupProducts(products)

	return (
		<div className={styles.wrapper}>
			<StoreSelector stores={stores} fetchProducts={fetchProducts} />
			<div className={styles.menu}>
				<CategoryTabs active={active} categories={categories} setActive={setActive} />
				<div className={styles.cards}>
					{products.length > 0 ? (
						categories[active].map((item) => (
							<Card
								fetchProducts={() => fetchProducts(stores[0].uuid)}
								key={item.uuid}
								item={item}
							/>
						))
					) : (
						<p className={styles.advice}>
							<FaAnglesUp /> Da click en una tienda para cargar los productos
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;