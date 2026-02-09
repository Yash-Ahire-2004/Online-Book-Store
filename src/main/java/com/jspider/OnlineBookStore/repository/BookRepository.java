package com.jspider.OnlineBookStore.repository;

import com.jspider.OnlineBookStore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
