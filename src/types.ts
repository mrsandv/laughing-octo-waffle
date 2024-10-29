export type TProduct = {
	uuid: string;
	name: string;
	description: string;
	imageUrl: string;
	legacyId: string;
	price: string;
	alcoholCount: number;
	soldAlone: boolean;
	availability: 'AVAILABLE' | 'UNAVAILABLE';
	providerAvailability: number | null;
	category: TCategory;
	barcode: string;
};

export type TCategory = {
	uuid: string;
	name: string;
	sortPosition: number;
};

export type TStore = {
	uuid: string;
	name: string;
	availabilityState: string;
	providers: string[];
	config: {
		brandColor: string;
	};
	secret: string;
	legacyId: string | null;
	organizationUuid: string;
};

export type TCredentials = {
	username: string;
	password: string;
};
