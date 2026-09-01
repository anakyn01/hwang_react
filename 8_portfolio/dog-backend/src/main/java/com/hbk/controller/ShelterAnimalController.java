package com.hbk.controller;

import com.hbk.dto.ShelterAnimalRequestDto;
import com.hbk.entity.ShelterAnimal;
import com.hbk.service.ShelterAnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shelter-animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ShelterAnimalController {

    private final ShelterAnimalService shelterAnimalService;

    @PostMapping
    public ResponseEntity<String> registerAnimal(
            @ModelAttribute ShelterAnimalRequestDto dto){
        shelterAnimalService.registerAnimal(dto);
        return ResponseEntity.ok("보호 동물이 성공적으로 등록되었습니다");
    }
}
