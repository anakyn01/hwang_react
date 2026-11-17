package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "PRODUCTION_ORDERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductionOrder {

    @Id
    @Column(name = "ORDER_ID", length = 50)
    private String id; // 예: PRD-2023-001 (React 프론트엔드의 문자열 id와 매핑)

    @Column(name = "PRODUCT_NAME", nullable = false, length = 100)
    private String productName;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @Column(name = "STATUS", length = 20)
    private String status; // planning, progress, completed

    @Column(name = "PROGRESS")
    private Integer progress; // 0 ~ 100

    @Column(name = "DUE_DATE")
    private LocalDate dueDate; // 2023-11-20
}
