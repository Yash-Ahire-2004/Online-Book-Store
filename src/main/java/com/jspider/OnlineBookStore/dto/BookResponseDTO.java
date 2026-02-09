package com.jspider.OnlineBookStore.dto;

public class BookResponseDTO {
	private Long id;
	private String title;
	private String author;
	private double price;
	private int stock;

	public BookResponseDTO(Long id, String title, String author, double price, int stock) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.price = price;
		this.stock = stock;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public double getPrice() {
		return price;
	}

	public int getStock() {
		return stock;
	}
}
