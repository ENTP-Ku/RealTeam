package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/records")
public class RecordController {
    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping("/create")
    public void create(@RequestBody Record record) {
        recordService.createRecord(record);
    }

    @GetMapping("/{id}")
    public Record getRecord(@PathVariable Long id) {
        return recordService.getRecord(id);
    }
}
