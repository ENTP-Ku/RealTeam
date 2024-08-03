package com.example.demo.repository;

import com.example.demo.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
    // JpaRepository는 save, findAll, findById 등의 메서드를 제공합니다.
}
