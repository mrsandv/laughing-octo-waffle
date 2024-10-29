import type { TProduct } from 'types';

export const groupProducts = (products: TProduct[]) => {
	return products.reduce((grouped: { [categoryName: string]: TProduct[] }, product: TProduct) => {
		const categoryName: string = product.category.name;
		grouped[categoryName] = grouped[categoryName] || [];
		grouped[categoryName].push(product);
		grouped.Todos = grouped.Todos || [];
		grouped.Todos.push(product);
		return grouped;
	}, {});
};
