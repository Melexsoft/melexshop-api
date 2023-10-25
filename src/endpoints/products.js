let resource = "/store/products";

export async function index({ endpoint, params }) {
    let api = resource
    if (params && Object.keys(params).length > 0) {
        api = api + "?" + new URLSearchParams(params);
    }
    return endpoint.get(api);
}

export async function show({ endpoint, id }) {
    return endpoint.get(resource + '/' + id);
}
export default { index, show }