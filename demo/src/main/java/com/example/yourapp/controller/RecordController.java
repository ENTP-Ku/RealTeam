package com.example.yourapp.controller;

import com.example.yourapp.entity.Record;
import com.example.yourapp.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Controller
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

    @PostMapping("/write")
    public String write(@RequestParam String title,
                        @RequestParam String content,
                        HttpServletRequest request) {

        Record record = new Record();
        record.setTitle(title);
        record.setContent(content);
        record.setCreatedDate(LocalDateTime.now());
        record.setUsername("qwer"); // This should come from the authenticated user
        record.setPassword("qwer"); // This should be handled securely

        recordRepository.save(record);

        return "welcome";
    }
}
