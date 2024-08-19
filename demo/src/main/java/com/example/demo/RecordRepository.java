package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository; // JPA Repository 인터페이스를 가져옵니다.
import org.springframework.stereotype.Repository; // Spring의 Repository 어노테이션을 가져옵니다.
import java.util.List; // Java의 List 클래스를 가져옵니다.

// Record 엔티티에 대한 CRUD 작업을 처리하는 JPA Repository 인터페이스입니다.
@Repository // 이 인터페이스가 Spring의 Repository 컴포넌트임을 명시합니다.
public interface RecordRepository extends JpaRepository<Record, Long> {

    // 날짜 기준으로 최신 게시물이 먼저 오도록 레코드를 조회하는 메서드입니다.
    List<Record> findAllByOrderByDateDesc(); // 모든 레코드를 날짜 내림차순으로 정렬하여 반환합니다.
}
