package com.example.demo.service;

import com.example.demo.entity.ProductionOrder;
import com.example.demo.repository.ProductionOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductionOrderService {

    private final ProductionOrderRepository productionOrderRepository;

    @Transactional(readOnly = true)
    public List<ProductionOrder> getAllOrders(){
        return productionOrderRepository.findAll();
    }

    @Transactional
    public ProductionOrder createOrder(ProductionOrder order){
        return productionOrderRepository.save(order);
    }
}

