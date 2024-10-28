import { getStores } from 'app/api';
import type { TProduct, TStore } from 'types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IStore {
	stores: TStore[];
	products: TProduct[];
	setStores: (stores: TStore[]) => void;
	setProducts: (products: TProduct[]) => void;
	fetchStores: () => Promise<void>;
}

export const useStore = create<IStore>()(
	persist(
		(set) => ({
			stores: [],
			products: [],
			setStores: (stores) =>
				set((state: any) => ({ ...state, stores: stores })),
			setProducts: (products) =>
				set((state: any) => ({ ...state, products: products })),
			fetchStores: async () => {
				try {
					const storesData = await getStores();
					// setStores(storesData)
					set({ stores: storesData });
				} catch (err) {
					console.log(err);
				}
			},
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
