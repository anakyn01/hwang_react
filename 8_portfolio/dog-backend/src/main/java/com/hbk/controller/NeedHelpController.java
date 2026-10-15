package com.hbk.controller;

import com.hbk.entity.FellowNews;
import com.hbk.entity.NeedHelp;
import com.hbk.service.FellowNewsService;
import com.hbk.service.NeedHelpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/need-help")
public class NeedHelpController {


    private final NeedHelpService needHelpService;

    //생성자
    public NeedHelpController(NeedHelpService needHelpService){

        this.needHelpService = needHelpService;
    }

    //목록 조회 API
    @GetMapping
    public List<NeedHelp> getNeedHelp(){

        return needHelpService.getAllNeedHelp();
    }

    @PostMapping
    public ResponseEntity<?> registerNeedHelp(@RequestBody NeedHelp needHelp){
try{
NeedHelp savedHelp = needHelpService.registerNeedHelp(needHelp);
return ResponseEntity.ok("도움요청글이  성공적으로 등록되었습니다.");
}catch(Exception e){
 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
         .body("도움 요청글 등록중 서버 오류가 발생했습니다.");
}

    }
}
