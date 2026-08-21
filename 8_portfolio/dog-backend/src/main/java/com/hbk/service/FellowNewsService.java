package com.hbk.service;

import com.hbk.entity.YoutubePost;
import com.hbk.repository.YoutubePostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly=true)// 기본적으로 읽기 전용으로 설정하여 조회 성능 최적화
public class YoutubePostService {

    private final YoutubePostRepository youtubePostRepository;

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
