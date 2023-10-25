const resource = '/store/basket/'
export async function show({ endpoint }) {
    return endpoint.get(resource);
}

export async function update({ endpoint, lineItems }) {
    return instance.put(resource, lineItems);
}

export default { update, show }