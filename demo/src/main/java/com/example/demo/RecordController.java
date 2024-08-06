package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class RecordController {
    @Autowired
    private RecordService recordService;

    @PostMapping("/create")
    public void createRecord(@RequestBody Record record) {
        recordService.createRecord(record);
    }

    @GetMapping("/user/{userId}")
    public List<Record> getRecordsByUserId(@PathVariable String userId) {
        return recordService.getRecordsByUserId(userId);
    }

    @GetMapping("/{postId}")
    public Record getRecord(@PathVariable Long postId) {
        return recordService.getRecord(postId);
    }
}
