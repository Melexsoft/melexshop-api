const resource = '/store/payment_confirmations/'

export async function create({ endpoint, json }) {
    endpoint.put(resource, json);
}

export async function update({ endpoint, id, formData }) {
    endpoint.put(resource + id, formData);
}

export default { create, update }