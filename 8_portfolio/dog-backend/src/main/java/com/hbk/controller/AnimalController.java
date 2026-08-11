package com.hbk.controller;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.hbk.dto.AnimalRequest;
import com.hbk.dto.AnimalResponse;
import com.hbk.dto.LinkParseRequest;
import com.hbk.service.AnimalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
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

	@PostMapping("/parse-link")
	public ResponseEntity<?> parseLink(@RequestBody LinkParseRequest request) {

		System.out.println("분석 요청된 URL: " + request.getUrl());
		AnimalRequest parsedData = new AnimalRequest();

		try {
			// 1. Jsoup을 사용해 해당 URL에 진짜로 접속해서 HTML 문서를 가져옵니다!
			// (차단당하지 않도록 일반 크롬 브라우저인 척 위장합니다)
			Document doc = Jsoup.connect(request.getUrl())
					.userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
					.timeout(5000) // 5초 안에 안 되면 포기
					.get();

			// 2. 카톡 미리보기처럼 표준 메타 태그(og:image, og:description 등)를 긁어옵니다.
			String imageUrl = doc.select("meta[property=og:image]").attr("content");
			String description = doc.select("meta[property=og:description]").attr("content");
			String title = doc.select("meta[property=og:title]").attr("content");

			// 모든 텍스트를 하나로 합쳐서 분석을 시작합니다.
			String fullText = title + " " + description;
			System.out.println("긁어온 텍스트: " + fullText);

			// 3. 긁어온 텍스트에서 '정규표현식'을 이용해 원하는 정보를 스마트하게 뽑아냅니다!

			// [이미지] 태그에서 긁어온 주소 넣기
			if (!imageUrl.isEmpty()) {
				parsedData.setImageUrl(imageUrl);
			}

			// [성별 분석] 텍스트에 '수컷', '남', '왕자' 등이 있으면 M, 아니면 F
			if (fullText.contains("수컷") || fullText.contains("남") || fullText.contains("왕자")) {
				parsedData.setGender("M");
			} else if (fullText.contains("암컷") || fullText.contains("여") || fullText.contains("공주")) {
				parsedData.setGender("F");
			}

			// [체중 분석] '숫자kg' 또는 '숫자 kg' 패턴을 찾습니다. (예: 5.5kg)
			Matcher weightMatcher = Pattern.compile("(\\d+(\\.\\d+)?)\\s*kg", Pattern.CASE_INSENSITIVE).matcher(fullText);
			if (weightMatcher.find()) {
				parsedData.setWeight(Double.parseDouble(weightMatcher.group(1)));
			} else {
				parsedData.setWeight(0.0); // 못 찾으면 0.0으로 세팅
			}

			// [출생년도 분석] '2023년생', '23년생', '3살' 등의 패턴 분석 (간단 버전)
			if (fullText.contains("2023") || fullText.contains("23년생")) {
				parsedData.setBirthYear("2023");
			} else if (fullText.contains("2022") || fullText.contains("22년생")) {
				parsedData.setBirthYear("2022");
			} else {
				parsedData.setBirthYear("알수없음");
			}

			// [지역 및 공고번호] 외부 SNS 특성상 정확한 지역/번호가 없을 수 있으므로 기본값 세팅
			parsedData.setRegion("텍스트에서 확인 필요");
			parsedData.setNoticeNo("제목: " + (title.length() > 20 ? title.substring(0, 20) + "..." : title));

			// 프론트엔드로 진짜 분석된 데이터를 전송합니다!
			return ResponseEntity.ok(parsedData);

		} catch (Exception e) {
			System.out.println("크롤링 실패: " + e.getMessage());
			// 접속이 막히거나 실패하면 에러를 던집니다.
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new AnimalResponse("해당 URL에서 데이터를 긁어올 수 없습니다. 보안이 걸려있거나 잘못된 주소입니다."));
		}
	}

}
