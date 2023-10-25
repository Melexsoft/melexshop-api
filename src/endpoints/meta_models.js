

export async function showMetaModel({ endpoint, id }) {
    return endpoint.get('/store/meta/models/' + id);
}


export async function showIndices({ endpoint, id }) {
    return endpoint.get('/store/meta/models/' + id + "/indices");
}


export async function showIndex({ endpoint, id, indexName, query }) {
    let api = '/store/meta/models/' + id + "/indices/" + indexName
    if (query && Object.keys(query).length > 0) {
        api = api + "?" + new URLSearchParams(query);
    }
    return endpoint.get(api);
}

export async function showEntries({ endpoint, id, query }) {
    let api = '/store/meta/models/' + id + "/entries"
    if (query && Object.keys(query).length > 0) {
        api = api + "?" + new URLSearchParams(query);
    }
    return endpoint.get(api);
}

export async function showEntry({ endpoint, id, identifier, query }) {
    let api = '/store/meta/models/' + id + "/entries/" + identifier
    if (query && Object.keys(query).length > 0) {
        api = api + "?" + new URLSearchParams(query);
    }
    return endpoint.get(api);
}

export default { showEntry, showEntries, showIndex, showIndices, showMetaModel }