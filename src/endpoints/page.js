const resource = '/store/pages/'

export async function show({ endpoint, id }) {
    return endpoint.get(resource + id);
}

export default { show }