import { groupProducts } from '../helpers';
import { products } from '../constants';

interface IProduct {
	uuid: string;
	name: string;
	description: string;
	imageUrl: string;
	legacyId: string;
	price: string;
	alcoholCount: number;
	soldAlone: boolean;
	availability: string;
	providerAvailability: number | null;
	category: {
		uuid: string;
		name: string;
		sortPosition: number;
	};
	barcode: string;
}

describe('groupProducts function', () => {
	it('should group products by category and include a "Todos" category', () => {
		const expectedResult = {
			Todos: products,
			'Combos Especiales': [products[0], products[1], products[2], products[4]],
			'Combo 30 cm': [products[3]],
			Promociones: [products[5]],
			Especialidades: [products[6]],
		};

		const actualResult = groupProducts(products);

		expect(actualResult).toEqual(expectedResult);
	});

	it('should handle an empty array of products', () => {
		const products: IProduct[] = [];

		const expectedResult = {};

		const actualResult = groupProducts(products);

		expect(actualResult).toEqual(expectedResult);
	});
});
