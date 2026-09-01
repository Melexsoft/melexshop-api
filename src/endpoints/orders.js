const resource = '/store/orders';

export async function create({ endpoint, json }) {
    return endpoint.post(resource + '/', json);
}

export async function show({ endpoint, id }) {
    return endpoint.get(resource + '/' + id);
}

export default { create, show };
