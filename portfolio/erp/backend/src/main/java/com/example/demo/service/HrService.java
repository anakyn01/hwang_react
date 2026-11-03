package com.example.demo.service;

import com.example.demo.entity.EmployeeEntity;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HrService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Map<String, Object> getEmployeesWithThreadLog(String search, String role, int page, int size) {

        // 💡 1. 스레드(Thread)를 활용한 비동기 감사 로그 기록
        new Thread(() -> {
            System.out.println("[Thread-ORM-Audit] HR ORM 조회 실행 - 검색어: " + search + ", 직급필터: " + role + " | 스레드 이름: " + Thread.currentThread().getName());
        }).start();

        // 💡 2. ORM 페이징 및 조건 조회 실행 (페이지 번호는 0부터 시작하므로 page - 1 처리)
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<EmployeeEntity> employeePage = employeeRepository.findBySearchAndRole(search, role, pageable);

        // 휴직자 수 집계
        long leaveCount = employeeRepository.countByStatus("leave");

        Map<String, Object> response = new HashMap<>();
        response.put("content", employeePage.getContent());
        response.put("currentPage", employeePage.getNumber() + 1);
        response.put("totalPages", employeePage.getTotalPages() == 0 ? 1 : employeePage.getTotalPages());
        response.put("totalElements", employeePage.getTotalElements());
        response.put("leaveCount", leaveCount);

        return response;
    }

    // 💡 여기에 saveEmployee 메서드를 추가해주시면 됩니다!
    public void saveEmployee(EmployeeEntity employee) {
        // 사번이 없을 경우 자동 생성 (예: EMP-현재타임스탬프)
        if (employee.getId() == null || employee.getId().isEmpty()) {
            employee.setId("EMP-" + System.currentTimeMillis());
        }
        // 기본 상태가 없으면 active로 지정
        if (employee.getStatus() == null || employee.getStatus().isEmpty()) {
            employee.setStatus("active");
        }

        employeeRepository.save(employee);
    }

    // 💡 특정 직원의 직급 및 재직 상태 업데이트
    public void updateEmployee(String id, EmployeeEntity updatedData) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 직원을 찾을 수 없습니다: " + id));

        employee.setRole(updatedData.getRole());
        employee.setStatus(updatedData.getStatus());
        employee.setDepartment(updatedData.getDepartment());

        employeeRepository.save(employee);
    }
}
