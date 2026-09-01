package com.hbk.repository;


import com.hbk.domain.ShelterStatus;
import com.hbk.entity.ShelterAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ShelterAnimalRepository extends JpaRepository<ShelterAnimal, Long> {

    List<ShelterAnimal> findByStatus(ShelterStatus status);

}
