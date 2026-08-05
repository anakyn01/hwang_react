package com.hbk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hbk.entity.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

}
