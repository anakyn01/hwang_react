package com.hbk.service;


import com.hbk.entity.NeedHelp;


import com.hbk.repository.NeedHelpRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly=true)// 기본적으로 읽기 전용으로 설정하여 조회 성능 최적화
public class NeedHelpService {

    private final NeedHelpRepository needHelpRepository;

    public NeedHelpService(NeedHelpRepository needHelpRepository){
        this.needHelpRepository = needHelpRepository;
    }
    //1. 유튜브 목록 조회 (최신순)
    public List<NeedHelp> getAllNeedHelp(){

        return needHelpRepository.findAllByOrderByInsertDtDesc();
    }

    //유튜브 등록
    @Transactional
    public NeedHelp registerNeedHelp(NeedHelp needHelp){

        return needHelpRepository.save(needHelp);
    }

}
