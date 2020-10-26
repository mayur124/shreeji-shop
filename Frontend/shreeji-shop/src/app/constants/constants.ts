const BASE_URL = '//localhost:8099'
export const URLS = {
    GET_ALL_BRANDS: BASE_URL + '/brands',
    FILTER: BASE_URL + '/f',
    PHONE_DETAIL: BASE_URL + '/phone'
}
export type SORT_TYPE = "" | "asc" | "desc";