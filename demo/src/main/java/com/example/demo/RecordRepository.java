package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    // 날짜 기준으로 최신 게시물을 먼저 가져오는 메서드
    List<Record> findAllByOrderByDateDesc();
}
