package com.example.demo;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/records")
public class RecordController {
    
    @Autowired
    private RecordRepository recordRepository;
    
    @PostMapping("/create")
    public ResponseEntity<String> createRecord(@RequestBody Record record) {
        record.setCreatedDate(LocalDateTime.now());
        recordRepository.save(record);
        return ResponseEntity.ok("글이 성공적으로 작성되었습니다.");
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Record> getRecord(@PathVariable Long id) {
        return recordRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/")
    public ResponseEntity<List<Record>> getAllRecords() {
        return ResponseEntity.ok(recordRepository.findAllByOrderByIdDesc());
    }
}
