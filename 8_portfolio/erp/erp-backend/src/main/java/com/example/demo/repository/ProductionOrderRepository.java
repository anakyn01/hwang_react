package com.example.demo.repository;

import com.example.demo.entity.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, String> {
// 기본 CRUD 메서드(findAll, findById, save, delete)가 자동으로 제공됩니다.
}
