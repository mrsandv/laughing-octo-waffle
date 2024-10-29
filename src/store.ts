import type { TProduct, TStore } from 'types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IStore {
	stores: TStore[];
	products: TProduct[];
	setStores: (stores: TStore[]) => void;
	setProducts: (products: TProduct[]) => void;
}

export const useStore = create<IStore>()(
	persist(
		(set) => ({
			stores: [],
			products: [],
			setStores: (stores) => set((state: any) => ({ ...state, stores: stores })),
			setProducts: (products) => set((state: any) => ({ ...state, products: products })),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
