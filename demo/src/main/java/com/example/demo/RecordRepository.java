package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<Record> findById(Long id); // 글번호로 검색
}
