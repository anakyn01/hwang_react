package com.hbk.service;

import com.hbk.entity.YoutubePost;
import com.hbk.repository.YoutubePostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//스프링에게 "이 클래스는 비즈니스 로직을 담당하는 서비스야!
@Service
/*
스프링에게 "이 클래스는 비즈니스 로직을 담당하는 서비스야!
* */
/*
'읽기 전용(readOnly = true)' 트랜잭션
불필요하게 변경 감지(Dirty Checking)를 하지 않도록
메모리 낭비를 줄이고 조회 속도를 크게 높여(최적화)
* */
@Transactional(readOnly=true)// 기본적으로 읽기 전용으로 설정하여 조회 성능 최적화
public class YoutubePostService {
/*
연결된 리포지토리가 프로그램 실행 중에
엉뚱한 값으로 바뀌지 않도록(불변성 보장)
*/
private final YoutubePostRepository youtubePostRepository;
/*
최근 스프링 프레임워크에 흐름..
스프링 공식 권장 방식으로,
클래스가 생성될 때 리포지토리가 무조건(필수적으로) 들어오도록 강제할 수 있어
NullPointerException을 완벽하게 예방할수 있어서
* */
    public YoutubePostService(YoutubePostRepository youtubePostRepository){
        this.youtubePostRepository = youtubePostRepository;
    }
    //1. 유튜브 목록 조회 (최신순)
    public List<YoutubePost> getAllYoutubePosts(){
        return youtubePostRepository.findAllByOrderByInsertDtDesc();
    }

    //유튜브 등록
    @Transactional
    public YoutubePost registerYoutubePost(YoutubePost youtubePost){
        return youtubePostRepository.save(youtubePost);
    }

}
