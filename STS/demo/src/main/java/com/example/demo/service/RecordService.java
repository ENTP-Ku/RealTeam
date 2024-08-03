package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.RecordRepository;
import com.example.demo.entity.Record;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;

    public List<Record> getAllRecords() {
        return recordRepository.findAll();  // 데이터베이스에서 모든 레코드 조회
    }

    public Optional<Record> getRecordById(Long id) {
        return recordRepository.findById(id);  // 데이터베이스에서 ID로 레코드 조회
    }

    public Record createRecord(Record record) {
        record.setCreatedDate(LocalDateTime.now());  // 작성 날짜 설정
        return recordRepository.save(record);  // 레코드 저장
    }
}
