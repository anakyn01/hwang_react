package com.hbk.repository;


import com.hbk.entity.FellowNews;
import com.hbk.entity.NeedHelp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NeedHelpRepository extends JpaRepository<NeedHelp, Long> {

  List<NeedHelp> findAllByOrderByInsertDtDesc();
}
