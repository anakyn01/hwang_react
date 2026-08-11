package com.hbk.repository;

import com.hbk.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByMemberEmail(String email);
    /*
    / 💡 번역: Admin 엔티티 안에 있는 member 객체로 들어가서,
    그 안의 email이 일치하는 녀석을 찾아라!
  (실행되는 SQL: SELECT * FROM admins a
    JOIN member m ON a.member_id = m.id WHERE m.email = ?)
    * */
}
