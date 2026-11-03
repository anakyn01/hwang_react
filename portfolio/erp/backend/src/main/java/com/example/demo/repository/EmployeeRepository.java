package com.example.demo.repository;

import com.example.demo.entity.EmployeeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String> {

    // 검색어(이름 또는 사번) 및 직급(RBAC) 조건에 따른 페이징 조회 쿼리
    @Query("SELECT e FROM EmployeeEntity e WHERE " +
            "(:search IS NULL OR :search = '' OR e.name LIKE %:search% OR e.id LIKE %:search%) AND " +
            "(:role IS NULL OR :role = '' OR :role = 'ALL' OR e.role = :role)")
    Page<EmployeeEntity> findBySearchAndRole(@Param("search") String search,
                                             @Param("role") String role,
                                             Pageable pageable);

    // 현재 휴직자 수 집계
    long countByStatus(String status);
}
