package com.example.demo.controller;


import com.example.demo.entity.EmployeeEntity;
import com.example.demo.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/hr")
@CrossOrigin(origins = "http://localhost:3000")
public class HrController {

    @Autowired
    private HrService hrService;

    @GetMapping("/employees")
    public ResponseEntity getEmployees(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, Object> result = hrService.getEmployeesWithThreadLog(search, role, page, size);
        return ResponseEntity.ok(result);
    }

    // 💡 2. 신규 임직원 등록 (POST) 추가
    @PostMapping("/employees")
    public ResponseEntity registerEmployee(@RequestBody EmployeeEntity employee) {
        hrService.saveEmployee(employee);
        return ResponseEntity.ok("성공적으로 등록되었습니다.");
    }

    // 💡 임직원 직급 및 상태(재직/휴직/퇴사) 수정 API
    @PutMapping("/employees/{id}")
    public ResponseEntity updateEmployee(
            @PathVariable("id") String id,
            @RequestBody EmployeeEntity updatedData) {
        hrService.updateEmployee(id, updatedData);
        return ResponseEntity.ok("성공적으로 수정되었습니다.");
    }
}