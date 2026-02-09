package com.jspider.OnlineBookStore.dto;

public class OrderItemResponseDTO {

	private String bookTitle;
	private double price;
	private int quantity;

	public OrderItemResponseDTO(String bookTitle, double price, int quantity) {
		this.bookTitle = bookTitle;
		this.price = price;
		this.quantity = quantity;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public double getPrice() {
		return price;
	}

	public int getQuantity() {
		return quantity;
	}
}
