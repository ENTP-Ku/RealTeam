package com.example.demo;

import java.util.List; // List 클래스를 가져옵니다.
import java.util.Map; // Map 클래스를 가져옵니다.
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션입니다.
import org.springframework.http.HttpStatus; // HTTP 상태 코드를 정의하는 클래스입니다.
import org.springframework.http.ResponseEntity; // HTTP 응답을 처리하는 클래스입니다.
import org.springframework.security.core.annotation.AuthenticationPrincipal; // 인증된 사용자 정보를 주입하기 위한 어노테이션입니다.
import org.springframework.web.bind.annotation.*; // Spring Web의 REST 컨트롤러 어노테이션을 가져옵니다.

// 레코드 관련 요청을 처리하는 REST 컨트롤러입니다.
@RestController
@RequestMapping("/api") // "/api" 경로로 들어오는 요청을 처리하는 클래스입니다.
public class RecordController {

    @Autowired
    private RecordService recordService; // RecordService 객체를 자동으로 주입합니다.

    // 레코드를 생성하는 메서드
    @PostMapping("/write") // "/api/write" 경로로 POST 요청을 처리합니다.
    public ResponseEntity<?> createRecord(@RequestBody RecordDTO recordDTO, @AuthenticationPrincipal String username) {
        // 인증된 사용자 이름이 유효하지 않으면 FORBIDDEN 상태를 반환
        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("유효하지 않은 토큰입니다.");
        }
        // 레코드를 저장하는 서비스 호출
        recordService.saveRecord(recordDTO, username);
        return ResponseEntity.ok("Record created successfully"); // 성공 메시지를 반환
    }

    // 모든 레코드를 조회하는 메서드
    @GetMapping("/records") // "/api/records" 경로로 GET 요청을 처리합니다.
    public ResponseEntity<List<RecordDTO>> getRecords() {
        // 모든 레코드를 가져와서 반환
        return ResponseEntity.ok(recordService.getAllRecords());
    }

    // 특정 레코드의 세부 정보를 조회하는 메서드
    @GetMapping("/detail/{id}") // "/api/detail/{id}" 경로로 GET 요청을 처리합니다. {id}는 경로 변수입니다.
    public ResponseEntity<RecordDTO> getRecordDetail(@PathVariable Long id) {
        // 특정 ID에 해당하는 레코드를 가져와서 반환
        return ResponseEntity.ok(recordService.getRecordById(id));
    }

    // 특정 레코드를 삭제하는 메서드
    @DeleteMapping("/detail/{id}") // "/api/detail/{id}" 경로로 DELETE 요청을 처리합니다. {id}는 경로 변수입니다.
    public ResponseEntity<?> deleteRecord(@PathVariable Long id, @AuthenticationPrincipal String username) {
        // 인증된 사용자 이름이 유효하지 않으면 FORBIDDEN 상태를 반환
        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없습니다.");
        }

        // 레코드를 삭제하는 서비스 호출
        String result = recordService.deleteRecord(id, username);
        // 삭제 성공 여부에 따라 적절한 메시지를 반환
        if (result.equals("deleteSuccess")) {
            return ResponseEntity.ok().body(Map.of("message", "삭제가 완료되었습니다."));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "삭제 권한이 없습니다."));
        }
    }
}
