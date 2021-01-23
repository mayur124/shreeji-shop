package com.shreejiShop.demo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.AddOrderCartItem;
import com.shreejiShop.demo.model.AddOrderRequest;
import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.CartAndWishlistResponse;
import com.shreejiShop.demo.model.CartItem;
import com.shreejiShop.demo.model.Order;
import com.shreejiShop.demo.model.OrderItemResponse;
import com.shreejiShop.demo.repository.CartItemRepo;
import com.shreejiShop.demo.repository.CartRepo;
import com.shreejiShop.demo.repository.OrdersRepo;
import com.shreejiShop.demo.repository.WishlistRepo;

@Service
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private WishlistRepo wishlistRepo;

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private CartItemRepo cartItemRepo;

	@Autowired
	private OrdersRepo ordersRepo;

	public Wishlist addToWishList(Wishlist wishlist) {
		return wishlistRepo.save(wishlist);
	}

	@Override
	public Wishlist deleteWishListRecord(Long wishlistId) throws Exception {
		Wishlist wishlistToDelete = wishlistRepo.findById(wishlistId).orElse(null);
		if (wishlistToDelete != null) {
			wishlistRepo.delete(wishlistToDelete);
			return wishlistToDelete;
		} else {
			throw new Exception("Wishlist with id " + wishlistId + " not found");
		}
	}

	@Override
	public List<CartAndWishlistResponse> getWishlistItemsOfUser(String username) {
		List<Object[]> wishlistResponse = wishlistRepo.getWishlistsOfUser(username);
		return _getListOfCartWishListResponse(wishlistResponse);
	}

	@Override
	public Cart addToCart(Cart cart) {
		return cartRepo.save(cart);
	}

	@Override
	public Cart deleteCartRecord(Long cartId) throws Exception {
		Cart cartRecordToDelete = cartRepo.findById(cartId).orElse(null);
		if (cartRecordToDelete != null) {
			cartRepo.delete(cartRecordToDelete);
			return cartRecordToDelete;
		} else {
			throw new Exception("Cart record with id " + cartId + " not found");
		}
	}

	@Override
	public List<CartAndWishlistResponse> getCartItemsOfUser(String userName) {
		List<Object[]> cartItemsResponse = cartRepo.getCartItemsOfUser(userName);
		return _getListOfCartWishListResponse(cartItemsResponse);
	}

	@Override
	@Transactional()
	public Order addOrder(AddOrderRequest orderRequest) {
		Order order = new Order();
		order.setOrderDate(new Date());
		order.setUserName(orderRequest.getUsername());
		Order savedOrder = ordersRepo.save(order);
		if (savedOrder != null) {
			for (AddOrderCartItem ci : orderRequest.getItemList()) {
				CartItem cartItem = new CartItem();
				cartItem.setOrderId(savedOrder.getOrderId());
				cartItem.setBrandId(ci.getBrandId());
				cartItem.setModelId(ci.getModelId());
				cartItem.setQuantity(ci.getQuantity());
				cartItemRepo.save(cartItem);
			}
			return savedOrder;
		}
		return null;
	}

	@Override
	@Transactional()
	public void emptyCart(String username) {
		cartRepo.deleteByUsername(username);
	}

	@Override
	public List<Order> getOrdersOfUser(String userName) {
		return ordersRepo.findByUsername(userName);
	}

	@Override
	public List<OrderItemResponse> getOrderItems(Long orderId) {
		List<Object[]> orderItemResponse = cartItemRepo.getOrderedItemList(orderId);
		List<OrderItemResponse> orderItemsList = new ArrayList<OrderItemResponse>();
		if (orderItemResponse != null) {
			for (Object[] object : orderItemResponse) {
				BigDecimal brandId = new BigDecimal(object[0].toString());
				String brandName = object[1].toString();
				BigDecimal modelId = new BigDecimal(object[2].toString());
				String modelName = object[3].toString();
				BigDecimal priceEur = new BigDecimal(object[4].toString());
				String imgUrl = object[5].toString();
				BigDecimal quantity = new BigDecimal(object[6].toString());
				orderItemsList
						.add(new OrderItemResponse(brandId, brandName, modelId, modelName, imgUrl, priceEur, quantity));
			}
		}
		return orderItemsList;
	}

	private List<CartAndWishlistResponse> _getListOfCartWishListResponse(List<Object[]> response) {
		List<CartAndWishlistResponse> list = new ArrayList<CartAndWishlistResponse>();
		if (response != null) {
			for (Object[] object : response) {
				BigDecimal id = new BigDecimal(object[0].toString());
				BigDecimal brandId = new BigDecimal(object[1].toString());
				String brandName = object[2].toString();
				BigDecimal modelId = new BigDecimal(object[3].toString());
				String modelName = object[4].toString();
				BigDecimal priceEur = new BigDecimal(object[5].toString());
				String imgUrl = object[6].toString();
				list.add(new CartAndWishlistResponse(id, brandId, brandName, modelId, modelName, priceEur, imgUrl));
			}
		}
		return list;
	}

}
