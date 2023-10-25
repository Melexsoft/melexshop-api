import { authorizedAxios } from './axios';


export async function create(basket, json) {
    const instance = await authorizedAxios({ headers: { 'BASKET-ID': basket } });
    return instance.post('/store/orders/', json);
}

export async function get(id) {
    const instance = await authorizedAxios();
    return instance.get(`/store/orders/${id}`);
}


export default { create, get }