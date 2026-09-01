let resource = "/store/products";

export async function index({ endpoint, queryParams }) {
    let api = resource;
    // Accept an object, a URLSearchParams, or a pre-built query string.
    let qs = "";
    if (queryParams instanceof URLSearchParams) {
        qs = queryParams.toString();
    } else if (queryParams && typeof queryParams === "object") {
        qs = new URLSearchParams(queryParams).toString();
    } else if (typeof queryParams === "string") {
        qs = queryParams.replace(/^\?/, "");
    }
    if (qs) api = api + "?" + qs;
    return endpoint.get(api);
}

export async function show({ endpoint, id }) {
    return endpoint.get(resource + '/' + id);
}
export default { index, show }
