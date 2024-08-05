// src/main/java/com/example/demo/controller/RecordController.java
package com.example.demo.controller;

import com.example.demo.entity.Record;
import com.example.demo.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RecordController {

    private final RecordRepository recordRepository;

    @GetMapping("/records")
    public List<Record> getRecords() {
        return recordRepository.findAll();
    }

    @PostMapping("/record")
    public void createRecord(@RequestBody Record record) {
        record.setDate(LocalDateTime.now());
        recordRepository.save(record);
    }

    @GetMapping("/record/{id}")
    public Record getRecord(@PathVariable Long id) {
        return recordRepository.findById(id).orElse(null);
    }
}
