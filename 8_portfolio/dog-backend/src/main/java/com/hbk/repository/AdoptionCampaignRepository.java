package com.hbk.repository;


import com.hbk.entity.AdoptionCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdoptionCampaignRepository extends JpaRepository<AdoptionCampaign, Long> {
List<AdoptionCampaign>findByHashtag(String hashtag);
}
