package com.jspider.OnlineBookStore.service;

import com.jspider.OnlineBookStore.dto.OrderItemDTO;
import com.jspider.OnlineBookStore.dto.OrderRequestDTO;
import com.jspider.OnlineBookStore.exception.InvalidRequestException;
import com.jspider.OnlineBookStore.model.*;
import com.jspider.OnlineBookStore.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jspider.OnlineBookStore.dto.OrderItemResponseDTO;
import com.jspider.OnlineBookStore.dto.OrderResponseDTO;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

	private final OrderRepository orderRepo;
	private final UserRepository userRepo;
	private final BookRepository bookRepo;

	public OrderService(OrderRepository orderRepo, UserRepository userRepo, BookRepository bookRepo) {
		this.orderRepo = orderRepo;
		this.userRepo = userRepo;
		this.bookRepo = bookRepo;
	}

	@Transactional
	public Order placeOrder(OrderRequestDTO dto) {

		User user = userRepo.findById(dto.getUserId()).orElseThrow(() -> new InvalidRequestException("User not found"));

		Order order = new Order();
		order.setUser(user);
		order.setOrderDate(LocalDateTime.now());

		List<OrderItem> orderItems = new ArrayList<>();
		double total = 0;

		for (OrderItemDTO itemDTO : dto.getItems()) {

			Book book = bookRepo.findById(itemDTO.getBookId())
					.orElseThrow(() -> new InvalidRequestException("Book not found"));

			if (book.getStock() < itemDTO.getQuantity()) {
				throw new InvalidRequestException("Not enough stock for " + book.getTitle());
			}

			book.setStock(book.getStock() - itemDTO.getQuantity());

			OrderItem item = new OrderItem();
			item.setBook(book);
			item.setQuantity(itemDTO.getQuantity());
			item.setPrice(book.getPrice());
			item.setOrder(order);

			total += book.getPrice() * itemDTO.getQuantity();
			orderItems.add(item);
		}

		order.setItems(orderItems);
		order.setTotalPrice(total);

		return orderRepo.save(order);
	}

	public List<Order> getOrdersByUser(Long userId) {
		return orderRepo.findByUserId(userId);
	}

	public List<OrderResponseDTO> getOrderHistory(Long userId) {

		List<Order> orders = orderRepo.findByUserId(userId);

		return orders.stream().map(order -> {

			List<OrderItemResponseDTO> items = order.getItems().stream().map(
					item -> new OrderItemResponseDTO(item.getBook().getTitle(), item.getPrice(), item.getQuantity()))
					.collect(Collectors.toList());

			return new OrderResponseDTO(order.getId(), order.getOrderDate(), order.getTotalPrice(), items);
		}).collect(Collectors.toList());
	}

}
