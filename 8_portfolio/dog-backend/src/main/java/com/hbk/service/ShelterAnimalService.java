package com.hbk.service;

import com.hbk.dto.ShelterAnimalRequestDto;
import com.hbk.entity.ShelterAnimal;
import com.hbk.repository.ShelterAnimalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

// 스프링에게 이 클래스가 비즈니스 로직을 처리하는 '서비스'
// 역할을 한다는 것을 알려줍니다.
@Service
@RequiredArgsConstructor
public class ShelterAnimalService {

    //DB와 통신을 담당하는 리포지토리를 가져옵니다. final을 붙여 변경되지 않도록 보호합니다.
    private final ShelterAnimalRepository repository;
/*
메서드 안의 작업들을 하나의 '트랜잭션'으로 묶습니다.
작업 중 하나라도 실패하면 모든 변경 사항을 원상태로 롤백해 DB를 안전하게 유지합니다.
 */
@Transactional
public void registerAnimal(ShelterAnimalRequestDto dto){
/*최종적으로 DB에 저장할 이미지 주소를 담을 변수입니다.
사용자가 폼에서 '링크'로 입력했을 경우를 대비해 우선 그 값으로 초기화합니다.
*/
    //
    String finalImageUrl = dto.getImageUrl();

    //프론트엔드에서 폼 데이터로 넘어온 파일 객체를 꺼냅니다
    MultipartFile file = dto.getImageFile();

    //파일이 실제로 존재하고, 비어있지 않은(정상적인) 파일일 경우에만 파일 저장 로직을 실행합니다
    if(file != null && !file.isEmpty()){
        try{
/*현재 실행 중인 프로젝트의 최상단 경로(user.dir)를 가져와
'/uploads/'라는 폴더 경로를 지정합니다.*/
String projectPath = System.getProperty("user.dir") + "/uploads/";
//위에서 만든 경로를 바탕으로 File 객체(폴더)를 생성합니다.
File uploadDir = new File(projectPath);
//만약 해당 경로에 uploads 폴더가 아직 존재하지 않는다면
if(!uploadDir.exists()){
    uploadDir.mkdirs();
}
//사용자가 올린 파일의 원래 이름(예: 강아지.jpg)을 가져옵니다
String originalFileName = file.getOriginalFilename();
//파일 이름이 겹쳐서 기존 파일이 덮어씌워지는 것을 막기 위해,
// 전 세계 유일한 무작위 문자열(UUID)을 생성합니다.
String uuid  = UUID.randomUUID().toString();
/*무작위 문자열과 원래 이름을 합쳐서 저장할 새 이름을 만듭니다.
(예: 1234abcd-5678_강아지.jpg)*/
String savedFileName = uuid + "_" + originalFileName;
// 최종 저장할 폴더 위치와 새 파일명을 합쳐서 파일 저장용 객체를 만듭니다.
File saveFile = new File(uploadDir, savedFileName);
//메모리에 임시로 올라와 있던 업로드된 파일을 실제로 방금 만든 맥북의 물리적 경로에 씁니다(저장합니다).
file.transferTo(saveFile);
/*
서버에 실제 파일 저장이 성공했으니,
DB에는 웹에서 해당 이미지를 불러올 수 있는 접근 경로(/uploads/파일명)로 덮어씌웁니다.
* */
finalImageUrl = "/uploads/" + savedFileName;
        }catch (IOException e){
throw new RuntimeException("파일 업로드중 오류가 발생했습니다", e);
        }
    }

    //dto -> entity 변환 빛 db 저장
    ShelterAnimal animal = ShelterAnimal.builder()
            .status(dto.getStatus())
            .gender(dto.getGender())
            .breed(dto.getBreed())
            .noticeNo(dto.getNoticeNo())
            .regDate(dto.getRegDate())
            .rescueLocation(dto.getRescueLocation())
            .content(dto.getContent())
            .imageUrl(finalImageUrl)
            .build();

    repository.save(animal);
}


}
