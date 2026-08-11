package com.hbk.service;

//이 주방장(Service)이 요리할 때 필요한 재료(클래스, DTO, 인터페이스)들을 다른 폴더에서 불러옵니다.
import com.hbk.dto.AdminResponse;
import com.hbk.dto.AnimalRequest;
import com.hbk.entity.Admin;
import com.hbk.entity.RecommendedAnimal;
import com.hbk.repository.AdminRepository;
import com.hbk.repository.RecommendedAnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnimalService {
//주방장(Service)이 DB에서 데이터를 꺼낼 때 사용할 전용 냉장고(Repository)입니다.
// (final이라 중간에 다른 냉장고로 바꿀 수 없습니다.)
    private final RecommendedAnimalRepository animalRepository;

    // 동물을 등록(저장)하는 핵심 기능입니다.
    public void registerAnimal(AnimalRequest request){

        // 1. 텅 빈 엔티티(테이블 데이터 한 줄)를 하나 새로 만듭니다.
        RecommendedAnimal animal = new RecommendedAnimal();
// 2. 프론트엔드에서 받아온 DTO의 데이터를 엔티티에 하나씩 옮겨 담습니다.
        animal.setSourceType (request.getSourceType());
        animal.setSourceUrl (request.getSourceUrl());
        animal.setRegion (request.getRegion());
        animal.setNoticeNo (request.getNoticeNo());
        animal.setBirthYear (request.getBirthYear());
        animal.setGender (request.getGender());
        animal.setWeight (request.getWeight());
        animal.setImageUrl (request.getImageUrl());

        //Repository)에 완성된 데이터를 저장(Insert)합니다!
        animalRepository.save(animal);
    }

}
