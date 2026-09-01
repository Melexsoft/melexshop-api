const resource = '/store/newsletter';

export async function create({ endpoint, json }) {
    return endpoint.post(resource, json);
}

export default { create };
