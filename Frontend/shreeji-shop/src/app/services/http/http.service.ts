import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SORT_TYPE, URLS } from 'src/app/constants/constants'
import { Brand } from 'src/app/models/brand.model';
import { BrandModelMap, PhoneData } from 'src/app/models/home.model';
import { PhoneModel } from 'src/app/models/phoneModel.model';
import { PriceRange } from "src/app/models/priceRange.model";
import { AddOrderRequest, Cart, CartAndWishlistResponse, Order, OrderItemResponse, Wishlist } from "src/app/models/transaction.model";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllBrands() {
    return this.http.get<{ brands: Brand[] }>(URLS.GET_ALL_BRANDS);
  }

  getPhoneModelsByBrandIds(brandIds: string, page: number = 0, sort: SORT_TYPE = "", priceRange: PriceRange) {
    if (sort == "") {
      return this.http.get<PhoneData>(URLS.FILTER + "?brandIds=" + brandIds + "&page=" + page + "&minPrice=" + priceRange.minPrice + "&maxPrice=" + priceRange.maxPrice);
    }
    return this.http.get<PhoneData>(URLS.FILTER + "?brandIds=" + brandIds + "&page=" + page + "&sort=" + sort + "&minPrice=" + priceRange.minPrice + "&maxPrice=" + priceRange.maxPrice);
  }

  getDefaultPhoneModels(page: number = 0, sort: SORT_TYPE = "", priceRange: PriceRange) {
    if (sort == "") {
      return this.http.get<PhoneData>(URLS.FILTER + "?page=" + page + "&minPrice=" + priceRange.minPrice + "&maxPrice=" + priceRange.maxPrice);
    }
    return this.http.get<PhoneData>(URLS.FILTER + "?page=" + page + "&sort=" + sort + "&minPrice=" + priceRange.minPrice + "&maxPrice=" + priceRange.maxPrice);
  }

  getPhoneDetails(phoneId: number) {
    return this.http.get<PhoneModel>(URLS.PHONE_DETAIL + "?phoneId=" + phoneId);
  }

  getSimilarPhones(brandId: number, phoneId: number) {
    return this.http.get<BrandModelMap[]>(URLS.SIMILAR_PHONES + "?brandId=" + brandId + "&phoneId=" + phoneId);
  }

  getPriceRange(brandIds?: string) {
    if (brandIds) {
      return this.http.get<PriceRange>(URLS.PRICE_RANGE + "?brandIds=" + brandIds);
    }
    return this.http.get<PriceRange>(URLS.PRICE_RANGE);
  }

  addToCart(phone: any) {
    const cart = new Cart();
    cart.brandId = phone.brandId;
    cart.modelId = phone.phoneId;
    cart.username = localStorage.getItem('username');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<CartAndWishlistResponse>(URLS.ADD_TO_CART, cart, httpOptions);
  }

  addToWishlist(wishlist: Wishlist) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Wishlist>(URLS.ADD_TO_WISHLIST, wishlist, httpOptions);
  }

  addOrder(order: AddOrderRequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Order>(URLS.ADD_ORDER, order, httpOptions);
  }

  getUserDetails() {
    const username = localStorage.getItem('username');
    return this.http.get<User>(`${URLS.GET_USER_DETAILS}/${username}`);
  }

  updateUserDetails(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<{ message: string }>(URLS.UPDATE_USER_DETAILS, user, httpOptions);
  }

  getCartItemsOfUser() {
    const username = localStorage.getItem('username');
    return this.http.get<CartAndWishlistResponse[]>(`${URLS.GET_CART_ITEMS}/${username}`);
  }

  removeItemFromCart(cartId: number) {
    return this.http.delete<Cart>(`${URLS.REMOVE_FROM_CART}/${cartId}`);
  }

  getWishlistOfUser() {
    const username = localStorage.getItem('username');
    return this.http.get<CartAndWishlistResponse[]>(`${URLS.GET_WISHLIST_ITEMS}/${username}`);
  }

  removeItemFromWishlist(wishlistId: number) {
    return this.http.delete<Wishlist>(`${URLS.REMOVE_FROM_WISHLIST}/${wishlistId}`);
  }

  getOrderList() {
    const username = localStorage.getItem('username');
    return this.http.get<Order[]>(`${URLS.GET_ORDER_LIST}/${username}`);
  }

  getOrderDetails(orderId: number) {
    return this.http.get<OrderItemResponse>(`${URLS.GET_ORDER_DETAILS}/${orderId}`);
  }
}
