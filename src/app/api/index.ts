import { toast } from 'react-toastify';
import type { TCredentials } from 'types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const signInAction = async (body: TCredentials) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/auth/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (res.ok) {
			return { success: true, message: 'Éxito al iniciar sesión', data };
		}
		return {
			success: false,
			message: 'Ocurrio un error al iniciar sesión',
			data,
		};
	} catch (err) {
		return {
			success: false,
			message: 'Ocurrio un error al iniciar sesión',
			data: err,
		};
	}
};

export const getStores = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/v1/users/me`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('token')}`,
		},
	});
	if (response.ok) {
		const data = await response.json();
		return data.result.stores;
	}
	toast.error('There is an error getting the stores data');
};

export const getProducts = async (id: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/v1/products/?store=${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('token')}`,
		},
	});
	const data = await response.json();
	if (response.ok) {
		return data.results;
	}
	toast.error('There is an error getting the products data');
};

export const changeProductStatus = async (id: string, status: boolean) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL_BASE}/api/v1/products/${id}/availability`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('token')}`,
				},
				body: JSON.stringify({
					availability: !status ? 'AVAILABLE' : 'UNAVAILABLE',
				}),
			}
		);
		const data = await res.json();
		if (res.ok) {
			return {
				success: true,
				message: 'Se cambio el estatus del producto',
				data,
			};
		}
		return {
			success: false,
			message: 'Ocurrio un error al intentar cambiar el estatus del producto',
			data,
		};
	} catch (err) {
		return {
			success: false,
			message: 'Ocurrio un error al intentar cambiar el estatus del producto',
			data: err,
		};
	}
};
