package com.hbk.service;


import com.hbk.dto.AdoptionCampaignRequest;
import com.hbk.entity.AdoptionCampaign;
import com.hbk.repository.AdoptionCampaignRepository;
//import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
/*
클래스 전체에 트랜잭션을 적용합니다. 특히 readOnly = true 옵션을 주면
데이터를 조회(SELECT)할 때 불필요한 성능 부하를 줄이고 최적화를 극대화
* */
public class AdoptionCampaignService {
    /*의존성 주입 (Dependency Injection)
직접 소통하는 리포지토리 객체를 선언합니다. final을 붙여 중간에 값이 바뀌지 않도록 안전하게 고정합니다.
    * */
    private final AdoptionCampaignRepository adoptionCampaignRepository;

    public AdoptionCampaignService(
            AdoptionCampaignRepository adoptionCampaignRepository){
this.adoptionCampaignRepository = adoptionCampaignRepository;
//전달받은 리포지토리 객체를 클래스 전역에서 쓸 수 있도록 변수에 저장합니다.
    }
    /*
전체 캠페인 목록 조회
    * */
    public List<AdoptionCampaign> getAllCampaigns(){
        return adoptionCampaignRepository.findAll();
        //모든 캠페인 데이터를 싹 다(findAll) 조회해서 가져온 뒤 호출한 곳으로 돌려줍니다.
    }
    //해시태그별 캠페인 목록 조회 메서드
    public List<AdoptionCampaign> getCampaignsByHashtag(String hashtag){
        return adoptionCampaignRepository.findByHashtag(hashtag);
        //리포지토리에 미리 만들어 둔 규칙 메서드(findByHashtag)를
        //실행시켜 조건에 맞는 데이터만 쏙 뽑아옵니다.
    }


    //위에서 클래스 단위로 readOnly = true(읽기 전용)를 걸어두었기 때문에,
    // 데이터를 추가·수정·삭제(INSERT/UPDATE/DELETE)하는 이 메서드에서는
    // 읽기 전용을 해제하고 쓰기 권한을 열어주기 위해 필수로 붙여야 하는 어노테이션
    @Transactional
    public void registerCampaign(AdoptionCampaignRequest request){
AdoptionCampaign campaign = new AdoptionCampaign();
        campaign.setHashtag(request.getHashtag());
        campaign.setTitle(request.getTitle());
        campaign.setContent(request.getContent());
        campaign.setThumbnailUrl(request.getThumbnailUrl());
        campaign.setMediaType(request.getMediaType());
        campaign.setMediaUrl(request.getMediaUrl());

        adoptionCampaignRepository.save(campaign);
    }


    /*public List<AdoptionCampaign> getCampaignsByHashtag(String hashtag) {
        return adoptionCampaignRepository.findByHashtag(hashtag);
    }*/
}
