const BASE_URL = '//localhost:8099'
export const URLS = {
    GET_ALL_BRANDS: BASE_URL + '/filter/brands',
    FILTER: BASE_URL + '/filter/f',
    PHONE_DETAIL: BASE_URL + '/filter/phone',
    SIMILAR_PHONES: BASE_URL + '/filter/similar',
    PRICE_RANGE: BASE_URL + '/filter/priceRange'
}
export type SORT_TYPE = "" | "asc" | "desc";