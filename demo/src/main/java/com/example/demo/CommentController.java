package com.example.demo;

import java.util.List; // 리스트를 사용하기 위한 import
import java.util.Map; // 맵을 사용하기 위한 import

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.http.HttpStatus; // HTTP 상태 코드 열거형을 사용하기 위한 import
import org.springframework.http.ResponseEntity; // HTTP 응답을 표현하는 클래스 import
import org.springframework.security.access.AccessDeniedException; // 접근 거부 예외 클래스를 사용하기 위한 import
import org.springframework.web.bind.annotation.*; // REST 컨트롤러 어노테이션을 사용하기 위한 import

@RestController // RESTful 웹 서비스 컨트롤러를 나타냅니다.
@RequestMapping("/api/detail/{recordId}/comments") // URL 패턴을 설정합니다. 댓글 관련 요청을 처리합니다.
public class CommentController {

    @Autowired // CommentService를 의존성 주입합니다.
    private CommentService commentService; // 댓글 관련 서비스 클래스

    /**
     * 특정 게시글의 모든 댓글을 가져오는 메서드
     * @param recordId 게시글 ID
     * @return 댓글 리스트
     */
    @GetMapping // GET 요청을 처리합니다.
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long recordId) {
        List<CommentDTO> comments = commentService.getComments(recordId); // 댓글 리스트를 서비스에서 가져옴
        return ResponseEntity.ok(comments); // 댓글 리스트를 HTTP 200 OK로 반환
    }

    /**
     * 특정 게시글에 댓글을 추가하는 메서드
     * @param recordId 게시글 ID
     * @param comment 추가할 댓글
     * @return 추가된 댓글
     */
    @PostMapping // POST 요청을 처리합니다.
    public ResponseEntity<CommentDTO> addComment(@PathVariable Long recordId, @RequestBody Comment comment) {
        CommentDTO addedComment = commentService.addComment(recordId, comment); // 댓글 추가
        return ResponseEntity.ok(addedComment); // 추가된 댓글을 HTTP 200 OK로 반환
    }

    /**
     * 특정 댓글을 수정하는 메서드
     * @param recordId 게시글 ID
     * @param commentId 댓글 ID
     * @param updatedComment 수정된 댓글
     * @return 수정된 댓글 또는 오류 메시지
     */
    @PutMapping("/{commentId}") // PUT 요청을 처리합니다.
    public ResponseEntity<?> updateComment(
            @PathVariable Long recordId,
            @PathVariable Long commentId,
            @RequestBody Comment updatedComment) {
        try {
            CommentDTO commentDTO = commentService.updateComment(commentId, updatedComment); // 댓글 수정
            return ResponseEntity.ok(commentDTO); // 수정된 댓글을 HTTP 200 OK로 반환
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "댓글 수정 권한이 없습니다.")); // 권한 없음 오류
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "댓글 수정 중 오류가 발생했습니다.")); // 서버 오류
        }
    }

    /**
     * 특정 댓글을 삭제하는 메서드
     * @param recordId 게시글 ID
     * @param commentId 댓글 ID
     * @return 삭제 성공 메시지 또는 오류 메시지
     */
    @DeleteMapping("/{commentId}") // DELETE 요청을 처리합니다.
    public ResponseEntity<?> deleteComment(
            @PathVariable Long recordId,
            @PathVariable Long commentId) {
        try {
            commentService.deleteComment(commentId); // 댓글 삭제
            return ResponseEntity.ok(Map.of("message", "댓글이 삭제되었습니다.")); // 삭제 성공 메시지
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "삭제 권한이 없습니다.")); // 권한 없음 오류
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "댓글 삭제 중 오류가 발생했습니다.")); // 서버 오류
        }
    }
}
