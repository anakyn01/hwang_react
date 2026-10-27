package com.hbk.repository;


import com.hbk.entity.FellowNews;
import com.hbk.entity.YoutubePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FellowNewsRepository extends JpaRepository<FellowNews, Long> {

  List<FellowNews> findAllByOrderByInsertDtDesc();
}
