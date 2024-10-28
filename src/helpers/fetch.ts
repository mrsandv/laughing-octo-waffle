interface httpRequestProps {
	url?: string;
	method?: 'PUT' | 'POST' | 'PATCH' | 'GET' | 'DELETE';
	path: string;
	body?: any;
	params?: any;
	token?: boolean;
	apikey?: boolean;
	files?: boolean;
}

export const customFetch = async ({
	path,
	token = true,
	apikey = false,
	method = 'GET',
	body = null,
	params = null,
	url = process.env.NEXT_PUBLIC_URL_BASE,
	files = false,
}: httpRequestProps): Promise<any> => {
	let apiUrl = url + path;

	if (params) {
		const searchParams = new URLSearchParams(params);
		apiUrl += `?${searchParams.toString()}`;
	}

	const headers = {};

	if (token) {
		headers['Authorization'] = cookies.get('authToken');
	}

	const bodyType = () => {
		if (!body) return null;
		return JSON.stringify(body);
	};

	const options = {
		method,
		headers,
		body: bodyType(),
		params,
	};

	try {
		const response = await fetch(apiUrl, options);

		// if (response.status === 401) {
		// 	toast.error('La sesión ha caducado, te llevaremos al login');
		// 	setTimeout(() => {
		// 		closeSession();
		// 	}, 3000);
		// }

		return await response.json();
	} catch (err) {
		console.log(err);
		throw err;
	}
};
