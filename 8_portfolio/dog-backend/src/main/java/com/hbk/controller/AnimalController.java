package com.hbk.controller;
import java.util.List;

import com.hbk.dto.AnimalRequest;
import com.hbk.dto.AnimalResponse;
import com.hbk.service.AnimalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hbk.entity.Animal;
import com.hbk.repository.AnimalRepository;

@RestController
/*이 클래스가 HTML 화면을 보여주는 것이 아니라, 
데이터(JSON 형태)를 프론트엔드에 
전달해주는 'REST API 전용 컨트롤러'임을 선언합니다.*/
@RequestMapping("/api/animals")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")//nextjs와 연동
public class AnimalController {
	
	private final AnimalRepository animalRepository;
	private final AnimalService animalService;
/*
데이터베이스와 통신할 Repository 객체를 담아둘 공간입니다. 
중간에 변경되지 않도록 final로 선언합니다.
*/	

	//자동으로 데이터베이스 통신 객체(Repository)를 주입(연결)해주는 생성자입니다.
	public AnimalController(AnimalRepository animalRepository, AnimalService animalService) {
		this.animalRepository = animalRepository;
		// 넘겨받은 Repository 객체를 이 클래스 전역에서 
		//쓸 수 있게 변수에 저장합니다.
		this.animalService =animalService;
	}
	
	@GetMapping("/recommended")
	public List<Animal> getRecommendedAnimals(){
		/*여러 마리의 동물 정보(Animal)가 담긴 리스트(List)를 
		결과값으로 내어주는 메서드를 정의합니다.*/
		return animalRepository.findAll();
		/*데이터베이스(animalRepository)에 저장된 모든 동물(findAll)을 
		찾아서 프론트엔드에 전달해줍니다.*/
	}

	//추가
	@PostMapping("/recommended")
	public ResponseEntity<?> registerRecommendedAnimal(@RequestBody AnimalRequest request,
	HttpServletRequest httpRequest){
		// 1. [세션 검사] 현재 접속한 브라우저의 신분증(세션)을 확인합니다.
		HttpSession session = httpRequest.getSession(false);

		// 2. 신분증이 없거나, 안에 관리자 이름이 없으면 401(권한 없음) 에러를 던집니다.
		if(session == null || session.getAttribute("adminName") == null){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AnimalResponse("관리자 로그인이 필요한 서비스입니다."));
		}
		// 3. 관리자가 맞다면, 주방장(Service)에게 저장을 지시합니다.
		try{
// 저장이 끝나면 200 OK(성공) 도장을 찍어 보냅니다.
animalService.registerAnimal(request);
return ResponseEntity.ok(new AnimalResponse("성공적으로 등록되었습니다."));
		}catch(Exception e){
// 저장 중 에러가 나면 500(서버 오류) 에러를 보냅니다.
return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		.body(new AnimalResponse("등록 중 서버 오류가 발생"));
		}

	}

}
