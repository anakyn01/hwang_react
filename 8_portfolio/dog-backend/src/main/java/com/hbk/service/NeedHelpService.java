package com.hbk.service;

import com.hbk.entity.FellowNews;
import com.hbk.repository.FellowNewsRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly=true)// 기본적으로 읽기 전용으로 설정하여 조회 성능 최적화
public class FellowNewsService {

    private final FellowNewsRepository fellowNewsRepository;

    public FellowNewsService(FellowNewsRepository fellowNewsRepository){
        this.fellowNewsRepository =fellowNewsRepository;
    }
    //1. 유튜브 목록 조회 (최신순)
    public List<FellowNews> getAllFellowNews(){

        return fellowNewsRepository.findAllByOrderByInsertDtDesc();
    }

    //유튜브 등록
    @Transactional
    public FellowNews registerFellowNews(FellowNews fellowNews){

        return fellowNewsRepository.save(fellowNews);
    }

}
