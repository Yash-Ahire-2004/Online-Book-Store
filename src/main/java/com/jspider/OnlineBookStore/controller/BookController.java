package com.jspider.OnlineBookStore.controller;

import com.jspider.OnlineBookStore.dto.BookRequestDTO;
import com.jspider.OnlineBookStore.dto.BookResponseDTO;
import com.jspider.OnlineBookStore.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("*")
public class BookController {

	private final BookService service;

	public BookController(BookService service) {
		this.service = service;
	}

	// Admin-style add (we’ll secure later)
	@PostMapping
	public BookResponseDTO add(@RequestBody BookRequestDTO dto) {
		return service.add(dto);
	}

	// Public list
	@GetMapping
	public List<BookResponseDTO> getAll() {
		return service.getAll();
	}
}
