
import axios from 'axios';
import EndpointContext from './endpoints/context';
import EndpointPage from './endpoints/page';
import EndpointPaymentConfirmation from './endpoints/payment_confirmations';
import EndpointBasket from './endpoints/basket';
import EndpointCategories from "./endpoints/categories"
import EndpointProducts from "./endpoints/products"
import EndpointFilters from "./endpoints/filters"
import EndpointMetaModels from "./endpoints/meta_models"
const typedefs = require("./typedefs");

const authorizedAxios = (props) => {
    let defaultHeaders = {
        'Content-Type': 'application/json',
        'STORE-ID': props.store_token
    }

    if (props?.headers) {
        defaultHeaders = { ...defaultHeaders, ...props.headers }
    }

    return axios.create({
        baseURL: props.host,
        headers: { ...defaultHeaders, }
    });
}

/**
 * Returns the external representation of the API.
 * 
 * @param {{store_token: string, endpoint: any }} paramenter Connection argument
 */
function connector({ store_token, host }) {

    const params = { store_token, host };
    const endpoint = authorizedAxios(params)
    return {
        /**
         * MetaModel Namespace
         */
        metaModels: {
            /**
             * Returns the Meta Model
             * 
             * @param {string} id - name of the Endpoint 
             * @returns 
             */
            show: async (id) => EndpointMetaModels.showMetaModel({ endpoint, id }),
            /**
             * Indices Namespace
             * 
             * Indices are Indexes build on the Meta Models, so you can search through them
             */
            indices: {
                /**
                 * Returns all Indecies about 
                 * @param {*} id 
                 * @returns 
                 */
                index: async (id) => EndpointMetaModels.showIndices({ endpoint, id }),
                /**
                 * Show the all grouped values for the index
                 * @param {*} id  - meta model id
                 * @param {*} indexName - the index name to get all possible values
                 * @param {*} queryParams - filter the result by other index - value combination
                 * @returns 
                 */
                show: async (id, indexName, queryParams) => EndpointMetaModels.showIndex({ endpoint, id, indexName, query })
            },
            /**
             * Entry Namespace
             */
            entries: {
                /**
                 * Returns all Entries inside the Meta Model
                 * @param {*} id 
                 * @param {*} query 
                 * @returns 
                 */
                index: (id, query) => EndpointMetaModels.showEntries({ endpoint, id, query }),
                /**
                 * Show the Entry inside the Meta Model
                 * @param {*} id 
                 * @param {*} identifier 
                 * @param {*} query 
                 * @returns 
                 */
                show: (id, identifier, query) => EndpointMetaModels.showEntry({ endpoint, id, identifier, query })
            }
        },

        /**
         * Category Namespace
         */
        categories: {
            /**
             * Query all products by params
             * @param {*} queryParams 
             * @returns 
             */
            index: async (queryParams) => EndpointCategories.index({ endpoint, queryParams }),
            /**
             * Show Category
             * @param {*} id 
             * @param {*} queryParams 
             * @returns 
             */
            show: async (id, queryParams) => EndpointCategories.show({ endpoint, id, queryParams })
        },

        /**
         * Product Namespace
         */
        products: {
            /**
             * Query Products by the queryparams
             * @param {*} queryParams 
             * @returns 
             */
            index: async (queryParams) => EndpointProducts.index({ endpoint, queryParams }),
            /**
             * Show Product
             * @param {*} id 
             * @param {*} queryParams 
             * @returns 
             */
            show: async (id, queryParams) => EndpointProducts.show({ endpoint, id, queryParams })
        },

        /**
         * Returns all possible filters for filtering collections
         */
        filters: {
            show: async () => EndpointFilters.show({ endpoint })
        },
        /**
         * Basket Namespace
         */
        basket: {
            /**
            * @param {string} basket - The Basket ID for the current Basket, if not found a new basket will created 
            * @returns {Promise<typedefs.Basket>} 
            */
            show: async (basket) => {
                let newEndpoint = authorizedAxios({ ...params, headers: { 'BASKET-ID': basket } })
                return await EndpointBasket.show({
                    endpoint: newEndpoint
                })
            },
            /**
            * 
            * @param {string} basket 
            * @param {LineItemAction[]} lineItems 
            * @returns {Promise<typedefs.Basket>} 
            */
            update: async (basket, lineItems) => {
                let newEndpoint = authorizedAxios({ ...params, headers: { 'BASKET-ID': basket } })
                return await EndpointBasket.update({ endpoint: newEndpoint, lineItems })
            },
        },

        /**
         * Context Namespace
         */
        context: {
            /**
             * @returns {Promise<typedefs.Context>}
             */

            show: async () => await EndpointContext.show({ endpoint })
        },

        /**
         *  Page Namespace
         */
        page: {
            /**
            * 
            * @param {string} id 
            * @returns {Promise<typedefs.Page>}
            */
            show: async (id) => await EndpointPage.show({ endpoint, id })
        },

        /**
         * Payment Namesapce
         */
        payment: {
            /**
            * 
            * @param {any} json - The JSOM that is required by the payment method 
            * @returns {{id: string}} returns the transaction id
            */
            create: async (json) => EndpointPaymentConfirmation.create({ endpoint, json }),
            /**
             * Confirms the Payment (If no Hook is provided by the Payment API)
             * @param {*} id 
             * @param {*} formData 
             * @returns 
             */
            update: async (id, formData) => EndpointPaymentConfirmation.update({ endpoint, id, formData })
        }
    }
}

/**
 * 
 * @param {{store_token: string, host: string | undefined}} paramenter Connection argument
 */
export default function melexshop(paramenter) {
    const store_token = paramenter.store_token;
    const host = paramenter.host || "https://api.melexsoft.com"
    return connector({ store_token, host })
}


