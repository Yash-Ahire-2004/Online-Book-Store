package com.jspider.OnlineBookStore.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {

	private Long orderId;
	private LocalDateTime orderDate;
	private double totalPrice;
	private List<OrderItemResponseDTO> items;

	public OrderResponseDTO(Long orderId, LocalDateTime orderDate, double totalPrice,
			List<OrderItemResponseDTO> items) {
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.totalPrice = totalPrice;
		this.items = items;
	}

	public Long getOrderId() {
		return orderId;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public List<OrderItemResponseDTO> getItems() {
		return items;
	}
}
