package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.repository.RecordRepository;

@Controller
public class WelcomeController {

    private final RecordRepository recordRepository;

    public WelcomeController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }
}
