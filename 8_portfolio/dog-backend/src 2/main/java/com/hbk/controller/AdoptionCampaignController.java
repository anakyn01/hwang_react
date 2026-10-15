package com.hbk.controller;

import com.hbk.dto.AdoptionCampaignRequest;
import com.hbk.dto.AdoptionCampaignResponse;
import com.hbk.entity.AdoptionCampaign;
import com.hbk.service.AdoptionCampaignService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdoptionCampaignController {
    private final AdoptionCampaignService adoptionCampaignService;

    public AdoptionCampaignController(
            AdoptionCampaignService adoptionCampaignService){
        this.adoptionCampaignService = adoptionCampaignService;
    }

    @GetMapping
/*프론트엔드에서 데이터를 달라고 하는
HTTP GET 요청이 오면 이 메서드를 실행하라고 스프링에게 알려줍니다.*/
public List<AdoptionCampaign> getCampaigns(@RequestParam(required = false) String hashtag){

    if(hashtag != null && !hashtag.trim().isEmpty()){
/*
프론트에서 해시태그 값을 보냈고(null이 아님),
빈칸만 보낸 게 아니라면(글자가 진짜로 있다면) 실행되는 조건문
 */
        return adoptionCampaignService.getCampaignsByHashtag(hashtag);
        //이 해시태그를 넘겨주면서 "이 태그가 달린 캠페인들만 골라서 가져와
    }
    return adoptionCampaignService.getAllCampaigns();
    /*
만약 해시태그 파라미터 없이 그냥 접근했다면,
조건 없이 데이터베이스에 있는 '모든' 캠페인 목록을 가져와서 프론트로 반환합니다.
    * */
    }
//2. 캠페인 등록 (관리자 권한 세션 체크 필수)
    @PostMapping
    public ResponseEntity<?> registerCampaign(
@RequestBody AdoptionCampaignRequest request, HttpServletRequest httpRequest) {
// 세션 검사 (신분 확인 단계)
        //HttpSession session = httpRequest.getSession(false);
/*
접속한 사람의 주머니(세션)를 뒤져봅니다. (false)는 "주머니가 없으면
새로 만들지 말고 그냥 없다고(null) 해라"라는 뜻입니다.
 */
        //if (session == null || session.getAttribute("adminName") == null) {
 /*
주머니(세션) 자체가 없거나, 주머니 안에
 "adminName"이라는 관리자 신분증이 없다면 실행되는 조건문입니다.
 * */
            //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AdoptionCampaignResponse("관리자 로그인이 필요한 서비스 입니다"));
        //}
        try {
// 서비스에 요청(request) 데이터를 넘겨서 DB에 저장하라고 시킵니다.
            adoptionCampaignService.registerCampaign(request);
// 저장이 성공하면 200 OK 도장을 찍어서 보냅니다.
            return ResponseEntity.ok(new AdoptionCampaignResponse("성공적으로 등록되었습니다"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AdoptionCampaignResponse("등록 중 서버 오류가 발생했습니다."));
        }
    }

}
