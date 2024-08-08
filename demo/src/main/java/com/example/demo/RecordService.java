package com.example.demo;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public void createRecord(Record record) {
        record.setCreatedDate(LocalDateTime.now()); // 현재 날짜로 설정
        recordRepository.save(record);
    }

    public Record getRecord(Long id) {
        return recordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
    }
}
