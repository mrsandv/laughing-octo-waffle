export type TProduct = {
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
