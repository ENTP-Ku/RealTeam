package com.example.demo.service;

import com.example.demo.entity.Record;
import com.example.demo.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;

    public void createRecord(String title, String content, String username) {
        Record record = new Record();
        record.setTitle(title);
        record.setContent(content);
        record.setUsername(username);
        record.setCreatedAt(LocalDateTime.now());
        recordRepository.save(record);
    }
}
