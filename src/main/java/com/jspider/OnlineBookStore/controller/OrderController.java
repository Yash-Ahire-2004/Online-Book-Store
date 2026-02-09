package com.jspider.OnlineBookStore.controller;

import com.jspider.OnlineBookStore.dto.OrderRequestDTO;
import com.jspider.OnlineBookStore.dto.OrderResponseDTO;
import com.jspider.OnlineBookStore.model.Order;
import com.jspider.OnlineBookStore.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

	private final OrderService service;

	public OrderController(OrderService service) {
		this.service = service;
	}

	@PostMapping
	public Order place(@RequestBody OrderRequestDTO dto) {
		return service.placeOrder(dto);
	}

	@GetMapping("/user/{userId}")
	public List<OrderResponseDTO> getByUser(@PathVariable Long userId) {
		return service.getOrderHistory(userId);
	}

}
