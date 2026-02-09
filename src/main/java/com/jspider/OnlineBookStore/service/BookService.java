package com.jspider.OnlineBookStore.service;

import com.jspider.OnlineBookStore.dto.BookRequestDTO;
import com.jspider.OnlineBookStore.dto.BookResponseDTO;
import com.jspider.OnlineBookStore.model.Book;
import com.jspider.OnlineBookStore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

	private final BookRepository repo;

	public BookService(BookRepository repo) {
		this.repo = repo;
	}

	public BookResponseDTO add(BookRequestDTO dto) {
		Book book = new Book();
		book.setTitle(dto.getTitle());
		book.setAuthor(dto.getAuthor());
		book.setPrice(dto.getPrice());
		book.setStock(dto.getStock());

		Book saved = repo.save(book);
		return map(saved);
	}

	public List<BookResponseDTO> getAll() {
		return repo.findAll().stream().map(this::map).collect(Collectors.toList());
	}

	private BookResponseDTO map(Book b) {
		return new BookResponseDTO(b.getId(), b.getTitle(), b.getAuthor(), b.getPrice(), b.getStock());
	}
}
