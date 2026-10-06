package com.hbk.controller;

import com.hbk.dto.MissingPostRequestDto;
import com.hbk.dto.MissingPostResponseDto;
import com.hbk.service.MissingPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
/*이 클래스가 REST API를 처리하는 컨트롤러이며,
반환값이 JSON으로 자동 변환됨을 선언합니다.*/
@RequestMapping("/api/missing-posts")
@RequiredArgsConstructor
/* final이 붙은 서비스 필드를 매개변수로 받는 생성자를
롬복이 자동으로 생성하여 의존성 주입(DI)을 처리합니다.*/
public class MissingPostController {

    //// 실종 신고 비즈니스 로직을 처리할 서비스 객체
    private final MissingPostService service;

    // 1. 실종 신고 글 작성 API (POST /api/missing-posts)
@PostMapping
public ResponseEntity<MissingPostResponseDto> createPost(
@RequestBody MissingPostRequestDto requestDto,
//// HTTP 요청 본문(Body)에 담긴 JSON 데이터를 DTO로 변환합니다.
Principal principal
// 스프링 시큐리티를 통해 현재 로그인한 사용자의 인증 정보(아이디 등)를 가져옵니다.
){
// 서비스의 글 작성 메서드를 호출하고,
// 현재 로그인한 사용자의 이름(principal.getName())을 함께 전달합니다.
MissingPostResponseDto response = service.createPost(requestDto, principal.getName());
//성공적으로 생성되었다는 HTTP 상태 코드(200 OK)와 함께 생성된 게시글 정보를 담아 응답합니다.
return  ResponseEntity.ok(response);
}
// 2. 무한 스크롤 조회 API (GET /api/missing-posts?cursorId=10&size=10)
@GetMapping
public ResponseEntity<List<MissingPostResponseDto>> getPosts(
// 페이징 기준이 되는 커서 ID (처음 요청 시에는 값이 없으므로(false) 비어있어도 됨)
@RequestParam(required = false) Long cursorId,
// 한 번에 불러올 게시글 개수 (전달되지 않으면 기본값 10개)
@RequestParam(defaultValue = "10") int size
){
// 커서 ID와 사이즈를 서비스에 전달하여 조건에 맞는 게시글 목록 리스트를 가져옵니다.
List<MissingPostResponseDto> posts =
service.getPostByScroll(cursorId, size);
// 조회된 게시글 목록 리스트를 응답으로 반환합니다.
return ResponseEntity.ok(posts);
}
// 3. 글 수정 API (PUT /api/missing-posts/{id})
@PutMapping("/{id}")
public ResponseEntity<MissingPostResponseDto> updatePost(
@PathVariable Long id,
//// URL 주소 경로에 포함된 수정할 게시글의 번호(id)를 가져옵니다.
@RequestBody MissingPostRequestDto requestDto,
//수정할 내용이 담긴 요청 DTO
Principal principal){
// 서비스의 글 수정 메서드를 호출하여 내용을 변경하고, 수정된 결과를 응답 DTO로 받아옵니다.
    MissingPostResponseDto response =
service.updatePost(id, requestDto, principal.getName());
//수정 완료된 게시글 정보를 응답합니다.
    return ResponseEntity.ok(response);
}
// 4. 글 삭제 API (DELETE /api/missing-posts/{id})
@DeleteMapping("/{id}")
public ResponseEntity<Void> deletePost(
 @PathVariable Long id, Principal principal
) {
    service.deletePost(id, principal.getName());
    //삭제 성공 시 본문 없이 정상 처리 응답(200 OK)만 보냅니다.
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
