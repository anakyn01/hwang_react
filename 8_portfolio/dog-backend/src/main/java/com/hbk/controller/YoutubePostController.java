package com.hbk.controller;


import com.hbk.entity.YoutubePost;
import com.hbk.service.YoutubePostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

//출처허용옵션
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController//프론트로는 사용하지 않고 db로만 json
@RequestMapping("/api/youtube")
public class YoutubePostController {

//비즈니스 로직을 사용하기 위해서..
    private final YoutubePostService youtubePostService;

    //생성자 주입을 하는 이유..
/*why 컨트롤러가 일하려면 서비스가 무조건 필요하므로, 컨트롤러가 태어날 때 서비스를 필수로 쥐여줘서
에러(NullPointer)를 원천 차단합니다*/
    public YoutubePostController(YoutubePostService youtubePostService){
        this.youtubePostService = youtubePostService;
    }

    //유튜브 목록 조회 API
    @GetMapping
    public List<YoutubePost> getYoutubePosts(){
        return youtubePostService.getAllYoutubePosts();
    }

    @PostMapping
    //ResponseEntity<?> 그냥보내는것이 아니라 상태코드 까지 같이 보낸다
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
