package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.repository.RecordRepository;

@Controller
public class DetailController {

    private final RecordRepository recordRepository;

    public DetailController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping("/detail")
    public String detail(@RequestParam Long id) {
        // 레코드 정보를 가져와서 뷰에 전달해야 함
        return "detail";
    }
}
