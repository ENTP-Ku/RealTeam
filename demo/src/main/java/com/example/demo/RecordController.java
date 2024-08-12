package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @PostMapping("/write")
    public ResponseEntity<?> createRecord(@RequestBody RecordDTO recordDTO, @AuthenticationPrincipal String username) {
        recordService.saveRecord(recordDTO, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/records")
    public ResponseEntity<List<RecordDTO>> getRecords() {
        return ResponseEntity.ok(recordService.getAllRecords());
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<RecordDTO> getRecordDetail(@PathVariable Long id) {
        return ResponseEntity.ok(recordService.getRecordById(id));
    }

    @DeleteMapping("/detail/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id, @AuthenticationPrincipal String username) {
        String result = recordService.deleteRecord(id, username);
        if (result.equals("deleteSuccess")) {
            return ResponseEntity.ok().body(Map.of("deleteSuccess", "삭제되었습니다"));
        } else {
            return ResponseEntity.ok().body(Map.of("deleteError", result));
        }
    }
}
