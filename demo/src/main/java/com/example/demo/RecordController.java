package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // REST API 컨트롤러로 설정
@RequestMapping("/api/records") // URL 매핑 설정
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class RecordController {

    @Autowired // 의존성 주입
    private RecordService recordService;

    @PostMapping("/create") // POST 요청 매핑
    public void createRecord(@RequestBody Record record) {
        recordService.createRecord(record); // 게시글 생성
    }

    @GetMapping("/all") // GET 요청 매핑
    public List<Record> getAllRecords() {
        return recordService.getAllRecords(); // 모든 게시글 검색
    }

    @GetMapping("/{id}") // GET 요청 매핑
    public Record getRecordById(@PathVariable Long id) {
        return recordService.getRecordById(id); // ID로 게시글 검색
    }
}
