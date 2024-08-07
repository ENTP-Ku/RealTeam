package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 서비스 계층으로 설정
public class RecordService {

    @Autowired // 의존성 주입
    private RecordRepository recordRepository;

    public void createRecord(Record record) {
        recordRepository.save(record); // 데이터베이스에 게시글 저장
    }

    public List<Record> getAllRecords() {
        return recordRepository.findAll(); // 모든 게시글 검색
    }

    public Record getRecordById(Long id) {
        return recordRepository.findById(id).orElse(null); // ID로 게시글 검색, 없으면 null 반환
    }
}
