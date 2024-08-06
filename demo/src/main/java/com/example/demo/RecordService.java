package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;

    // 게시글 작성
    public void createRecord(Record record) {
        recordRepository.save(record);
    }

    // 사용자 게시글 목록 가져오기
    public List<Record> getRecordsByUserId(String userId) {
        return recordRepository.findByUserId(userId);
    }

    // 게시글 찾기
    public Record getRecord(Long postId) {
        return recordRepository.findById(postId).orElse(null);
    }
}
