package com.jspider.OnlineBookStore.repository;

import com.jspider.OnlineBookStore.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
