package com.example.demo.controller;

import com.example.demo.entity.Record;
import com.example.demo.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "*")
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createRecord(@RequestBody Record record) {
        record.setCreatedDate(LocalDateTime.now());
        recordRepository.save(record);
        return ResponseEntity.ok("글 작성 완료");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Record> getRecord(@PathVariable Long id) {
        return recordRepository.findById(id)
                .map(record -> ResponseEntity.ok(record))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/list")
    public ResponseEntity<Iterable<Record>> getAllRecords() {
        return ResponseEntity.ok(recordRepository.findAll());
    }
}
