package com.hbk.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hbk.entity.Animal;
import com.hbk.repository.AnimalRepository;

@RestController
/*이 클래스가 HTML 화면을 보여주는 것이 아니라, 
데이터(JSON 형태)를 프론트엔드에 
전달해주는 'REST API 전용 컨트롤러'임을 선언합니다.*/
@RequestMapping("/api/animals")
@CrossOrigin(origins="http://localhost:3000")//nextjs와 연동
public class AnimalController {
	
	private final AnimalRepository animalRepository;
/*
데이터베이스와 통신할 Repository 객체를 담아둘 공간입니다. 
중간에 변경되지 않도록 final로 선언합니다.
*/	

	//자동으로 데이터베이스 통신 객체(Repository)를 주입(연결)해주는 생성자입니다.
	public AnimalController(AnimalRepository animalRepository) {
		this.animalRepository = animalRepository;
		// 넘겨받은 Repository 객체를 이 클래스 전역에서 
		//쓸 수 있게 변수에 저장합니다.
	}
	
	@GetMapping("/recommended")
	public List<Animal> getRecommendedAnimals(){
		/*여러 마리의 동물 정보(Animal)가 담긴 리스트(List)를 
		결과값으로 내어주는 메서드를 정의합니다.*/
		return animalRepository.findAll();
		/*데이터베이스(animalRepository)에 저장된 모든 동물(findAll)을 
		찾아서 프론트엔드에 전달해줍니다.*/
	}

}
