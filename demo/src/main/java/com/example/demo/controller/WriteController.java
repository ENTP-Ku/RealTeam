package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.entity.Record;
import com.example.demo.repository.RecordRepository;

import java.time.LocalDateTime;

@Controller
public class WriteController {

    private final RecordRepository recordRepository;

    public WriteController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping("/write")
    public String write() {
        return "write";
    }

    @PostMapping("/write")
    public String submitRecord(
            @RequestParam String title,
            @RequestParam String content) {

        Record record = new Record();
        record.setTitle(title);
        record.setContent(content);
        record.setCreatedDate(LocalDateTime.now());
        record.setUsername("testUser"); // 로그인 사용자 이름으로 설정해야 함
        recordRepository.save(record);

        return "redirect:/welcome";
    }
}
