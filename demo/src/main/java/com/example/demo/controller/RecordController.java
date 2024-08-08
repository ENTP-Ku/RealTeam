package com.example.demo.controller;

import com.example.demo.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class RecordController {
    @Autowired
    private RecordService recordService;

    @PostMapping("/create")
    public void createRecord(@RequestParam String title, @RequestParam String content, @RequestParam String username) {
        recordService.createRecord(title, content, username);
    }
}
