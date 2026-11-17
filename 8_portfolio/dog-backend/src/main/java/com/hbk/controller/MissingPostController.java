package com.hbk.controller;

import com.fasterxml.jackson.databind.ObjectMapper; // 임포트 유지
import com.hbk.dto.MissingPostRequestDto;
import com.hbk.dto.MissingPostResponseDto;
import com.hbk.service.MissingPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/missing-posts")
@RequiredArgsConstructor
public class MissingPostController {

    private final MissingPostService service;
    // ❌ private final ObjectMapper objectMapper; (이 필드를 삭제합니다!)

    // 1. 실종 신고 글 작성 API (POST /api/missing-posts)
    // 1. 실종 신고 글 작성 API (정석적인 @RequestPart 활용)
    @PostMapping
    public ResponseEntity<MissingPostResponseDto> createPost(
            @RequestPart("dto") MissingPostRequestDto requestDto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            Principal principal
    ) {

        // 💡 service.createPost에 requestDto, file, principal.getName() 3개를 정확히 전달합니다.
        MissingPostResponseDto response = service.createPost(requestDto, file, principal.getName());
        return ResponseEntity.ok(response);
    }

    // 2. 무한 스크롤 조회 API (GET /api/missing-posts?cursorId=10&size=10)
    @GetMapping
    public ResponseEntity<List<MissingPostResponseDto>> getPosts(
            @RequestParam(required = false) Long cursorId,
            @RequestParam(defaultValue = "10") int size
    ){
        List<MissingPostResponseDto> posts = service.getPostByScroll(cursorId, size);
        return ResponseEntity.ok(posts);
    }

    // 3. 글 수정 API (PUT /api/missing-posts/{id})
    @PutMapping("/{id}")
    public ResponseEntity<MissingPostResponseDto> updatePost(
            @PathVariable Long id,
            @RequestBody MissingPostRequestDto requestDto,
            Principal principal){
        MissingPostResponseDto response = service.updatePost(id, requestDto, principal.getName());
        return ResponseEntity.ok(response);
    }

    // 4. 글 삭제 API (DELETE /api/missing-posts/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id, Principal principal
    ) {
        service.deletePost(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    // 5. 완료 처리 API (PATCH /api/missing-posts/{id}/complete)
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> completePost(
            @PathVariable Long id,
            Principal principal
    ) {
        service.completPost(id, principal.getName());
        return ResponseEntity.ok().build();
    }
}