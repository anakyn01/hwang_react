package com.hbk.repository;
import com.hbk.entity.MissingPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissingPostRepository extends JpaRepository<MissingPost, Long> {
@Query("SELECT p FROM MissingPost p WHERE (:cursorId IS NULL OR p.id < :cursorId) ORDER BY p.id DESC")
//쿼리뒤에 세미콜론이 오면..오타 어노테이션은 세미콜론을 붙이는 것이 아니라 바로메서드가 와야됨..
List<MissingPost> findAllByCursor(@Param("cursorId") Long cursorId, Pageable pageable);
/*
List<MissingPost> : 조건에 맞는 게시글 여러 개를 리스트 형태로 반환합니다.
findAllByCursor : 우리가 직접 이름을 지은 커스텀 조회 메서드입니다.
@Param("cursorId") Long cursorId :
쿼리문 안의 :cursorId 자리에 외부에서 전달받은 변수 값을 집어넣어 줍니다.
Pageable pageable 번에 몇 개씩 가져올지(예: 10개씩)
개수 제한을 걸어주는 페이징 객체입니다.

무한 스크롤 구현을 위한 커서 기반 조회
(cursorId보다 작은 ID의 데이터를 지정된 개수만큼 가져옴)
SELECT p FROM MissingPost p
엔티티 p들을 조회 하겠다는 의미
WHERE (:cursorId IS NULL OR p.id < :cursorId)
만약 처음 페이지를 불러와서 cursorId가 비어있다면(NULL),
이 조건은 무시되고 가장 최신 글부터 가져옵니다.
*/

}
