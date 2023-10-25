const resource = "/store/categories"
export async function index({ endpoint, queryParams }) {
    return endpoint.get(resource + '?' + queryParams);
}

export async function show({ endpoint, queryParams, id }) {
    return endpoint.get(resource + '/' + id + "?" + queryParams);
}

export default { index, show }