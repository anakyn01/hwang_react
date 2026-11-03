package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_HR_EMPLOYEE")
@Getter
@Setter
public class EmployeeEntity {

    @Id
    @Column(name = "EMP_ID", length = 20)
    private String id;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "DEPARTMENT", nullable = false, length = 50)
    private String department;

    @Column(name = "ROLE", nullable = false, length = 50)
    private String role; // 부장, 과장, 대리, 계장, 수석디자이너, PL, PM 등

    @Column(name = "STATUS", length = 20)
    private String status = "active"; // active, leave, resigned

    @Column(name = "JOIN_DATE", nullable = false, length = 20)
    private String joinDate;
}
