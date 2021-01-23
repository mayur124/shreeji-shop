const BASE_URL = '//localhost:8099'
export const URLS = {
    GET_ALL_BRANDS: BASE_URL + '/filter/brands',
    FILTER: BASE_URL + '/filter/f',
    PHONE_DETAIL: BASE_URL + '/filter/phone',
    SIMILAR_PHONES: BASE_URL + '/filter/similar',
    PRICE_RANGE: BASE_URL + '/filter/priceRange',
    SIGN_UP: BASE_URL + '/auth/signup',
    LOGIN: BASE_URL + '/auth/login',
    LOGOUT: BASE_URL + '/auth/logout',
    REFRESH_TOKEN: BASE_URL + '/auth/refresh/token',
    ADD_TO_CART: BASE_URL + '/transaction/cart/add',
    ADD_TO_CART_FROM_WISHLIST: BASE_URL + '/transaction/cart/add/from/wishlist',
    ADD_TO_WISHLIST: BASE_URL + '/transaction/wishlist/add',
    ADD_ORDER: BASE_URL + '/transaction/order/add',
    GET_USER_DETAILS: BASE_URL + '/auth/user/details',
    UPDATE_USER_DETAILS: BASE_URL + '/auth/user/update',
    GET_CART_ITEMS: BASE_URL + '/transaction/cart/list',
    REMOVE_FROM_CART: BASE_URL + '/transaction/cart/remove',
    GET_WISHLIST_ITEMS: BASE_URL + '/transaction/wishlist/list',
    REMOVE_FROM_WISHLIST: BASE_URL + '/transaction/wishlist/remove',
    GET_ORDER_LIST: BASE_URL + '/transaction/order/list',
    GET_ORDER_DETAILS: BASE_URL + '/transaction/order/details'
}
export type SORT_TYPE = "" | "asc" | "desc";
export type SPAN_TYPES = 'error' | 'progress' | 'success';