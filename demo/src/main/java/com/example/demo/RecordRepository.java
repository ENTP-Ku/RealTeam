package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
    // 특정 아이디로 작성된 게시글 검색
    List<Record> findByUserId(String userId);
}
