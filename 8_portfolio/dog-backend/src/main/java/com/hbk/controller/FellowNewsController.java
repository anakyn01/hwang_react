package com.hbk.controller;

import com.hbk.entity.FellowNews;
import com.hbk.entity.YoutubePost;
import com.hbk.service.FellowNewsService;
import com.hbk.service.YoutubePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/fellow-news")
public class FellowNewsController {


    private final FellowNewsService fellowNewsService;

    //생성자
    public FellowNewsController(FellowNewsService fellowNewsService){
        this.fellowNewsService = fellowNewsService;
    }

    //목록 조회 API
    @GetMapping
    public List<FellowNews> getFellowNews(){

        return fellowNewsService.getAllFellowNews();
    }

    @PostMapping
    public ResponseEntity<?> registerFellowNews(@RequestBody FellowNews fellowNews){
try{
FellowNews savedNews = fellowNewsService.registerFellowNews(fellowNews);
return ResponseEntity.ok("펠로우 소식이 성공적으로 등록되었습니다.");
}catch(Exception e){
 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
         .body("펠로우 소식 등록 중 서버 오류가 발생했습니다.");
}

    }
}
