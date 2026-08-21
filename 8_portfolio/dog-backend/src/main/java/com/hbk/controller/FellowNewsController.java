package com.hbk.controller;

import com.hbk.dto.AdminRequest;
import com.hbk.dto.AdminResponse;
import com.hbk.entity.YoutubePost;
import com.hbk.service.AdminService;
import com.hbk.service.YoutubePostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YoutubePostController {


    private final YoutubePostService youtubePostService;

    //생성자
    public YoutubePostController(YoutubePostService youtubePostService){
        this.youtubePostService = youtubePostService;
    }

    //유튜브 목록 조회 API
    @GetMapping
    public List<YoutubePost> getYoutubePosts(){
        return youtubePostService.getAllYoutubePosts();
    }

    @PostMapping
    public ResponseEntity<?> registerYoutubePost(@RequestBody YoutubePost youtubePost){
try{
YoutubePost savedPost = youtubePostService.registerYoutubePost(youtubePost);
return ResponseEntity.ok("유튜브 영상이 성공적으로 등록되었습니다");
}catch(Exception e){
 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
         .body("유튜브 영상 등록 중 서버 오류가 발생했습니다.");
}

    }
}
