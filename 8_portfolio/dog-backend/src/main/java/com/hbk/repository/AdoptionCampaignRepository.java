package com.hbk.repository;


import com.hbk.entity.RecommendedAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendedAnimalRepository extends JpaRepository<RecommendedAnimal, Long> {
// JpaRepository를 상속받으면 기본적인 저장(save),
// 조회(findAll) 기능이 자동으로 생깁니다!
}
