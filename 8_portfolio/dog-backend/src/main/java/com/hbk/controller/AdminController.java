package com.hbk.controller;

import com.hbk.dto.AdminRequest;
import com.hbk.dto.AdminResponse;
import com.hbk.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
//이 클래스는 화면(HTML)을 뱉는 게 아니라,
// 데이터(JSON)만 깔끔하게 뱉는 전문 서빙 점원이야!" 라고 선언합니다.
@RequestMapping("/api/admin")
@RequiredArgsConstructor
//이 클래스는 화면(HTML)을 뱉는 게 아니라,
// 데이터(JSON)만 깔끔하게 뱉는 전문 서빙 점원이야!" 라고 선언합니다.
public class AdminController {

    //점원(Controller)이 주방장(Service)에게 일을
    // 시켜야 하므로 주방장 객체를 불러옵니다. (final은 절대 바뀌지 않는다는 뜻)
    private final AdminService adminService;

    @PostMapping("/login")
    //프론트엔드에게 상태 코드(200 성공, 401 실패 등)와 함께 데이터
    //?아무 박스나 다 된다는 뜻
    public ResponseEntity<?> login(@RequestBody AdminRequest request, HttpServletRequest httpRequest){
try{
    AdminResponse response  = adminService.authenticate(
            request.getEmail(),
            request.getPassword()
    );

    // 💡 [여기가 핵심입니다!] 이 두 줄이 무조건 있어야 합니다!!!
    HttpSession session = httpRequest.getSession(true);
    session.setAttribute("adminName", response.getName());


    return ResponseEntity.ok(response);
}catch(IllegalArgumentException e){
 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
         .body(Collections.singletonMap("message", e.getMessage()));
}

    }
}
