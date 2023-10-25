
const resource = "/store/filter";
export async function show({ endpoint }) {
    return endpoint.get(resource);
}

export default { show }