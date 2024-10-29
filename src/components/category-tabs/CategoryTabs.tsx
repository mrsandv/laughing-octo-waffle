import styles from './category-tabs.module.css';

const CategoryTabs = ({
	categories,
	active,
	setActive,
}: { categories: any; active: string; setActive: (key: string) => void }) => {
	const sortCats = Object.keys(categories).sort(
		(a, b) => categories[b].length - categories[a].length
	);

	return (
		<div className={styles.tabs}>
			{sortCats.length > 0 && (
				<>
					<p className={styles.title}>Categorias</p>
					{sortCats.map((key: string) => (
						<div
							className={`${styles.tab} ${active === key ? styles.active : ''}`}
							onClick={() => setActive(key)}
							key={key}
						>
							<span className={styles.label}>{key}</span>
							<span className={`${styles.counter} ${active === key ? styles.activeC : ''}`}>
								{categories[key].length}
							</span>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default CategoryTabs;
