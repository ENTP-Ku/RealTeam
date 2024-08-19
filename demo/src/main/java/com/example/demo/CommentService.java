package com.example.demo;

import java.util.List; // 리스트를 사용하기 위한 import
import java.util.stream.Collectors; // 스트림을 사용하여 리스트를 처리하기 위한 import
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.security.access.AccessDeniedException; // 접근 거부 예외를 처리하기 위한 import
import org.springframework.security.core.Authentication; // 인증 정보를 가져오기 위한 import
import org.springframework.security.core.context.SecurityContextHolder; // 보안 컨텍스트를 가져오기 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 표시하기 위한 import

@Service // 이 클래스가 Spring의 서비스 컴포넌트임을 나타냅니다.
public class CommentService {

    @Autowired
    private CommentRepository commentRepository; // Comment 엔티티를 처리할 리포지토리 주입

    @Autowired
    private RecordRepository recordRepository; // Record 엔티티를 처리할 리포지토리 주입

    @Autowired
    private UserRepository userRepository; // User 엔티티를 처리할 리포지토리 주입

    /**
     * 주어진 게시글 ID에 대한 모든 댓글을 조회하여 CommentDTO 리스트로 반환합니다.
     * @param recordId 게시글의 ID
     * @return 댓글의 DTO 리스트
     */
    public List<CommentDTO> getComments(Long recordId) {
        // 댓글을 조회하고, DTO로 변환하여 리스트로 반환
        List<Comment> comments = commentRepository.findByRecordId(recordId);
        return comments.stream().map(CommentDTO::new).collect(Collectors.toList());
    }

    /**
     * 주어진 게시글 ID와 댓글 정보를 바탕으로 댓글을 추가합니다.
     * @param recordId 게시글의 ID
     * @param comment 추가할 댓글
     * @return 추가된 댓글의 DTO
     */
    public CommentDTO addComment(Long recordId, Comment comment) {
        // 현재 인증된 사용자의 사용자 이름을 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // 사용자 정보를 조회
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found"); // 사용자가 없으면 예외 발생
        }

        // 게시글 정보를 조회
        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Record not found")); // 게시글이 없으면 예외 발생

        // 댓글에 게시글과 사용자 설정
        comment.setRecord(record);
        comment.setUser(user);

        // 댓글을 데이터베이스에 저장하고 DTO로 변환하여 반환
        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(savedComment);
    }

    /**
     * 주어진 댓글 ID를 바탕으로 댓글을 수정합니다.
     * @param commentId 댓글의 ID
     * @param updatedComment 수정된 댓글 정보
     * @return 수정된 댓글의 DTO
     */
    public CommentDTO updateComment(Long commentId, Comment updatedComment) {
        // 현재 인증된 사용자의 사용자 이름을 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // 댓글 정보를 조회
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found")); // 댓글이 없으면 예외 발생

        // 댓글 작성자가 현재 사용자와 일치하지 않으면 접근 거부
        if (!existingComment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("권한이 없습니다."); // 권한 오류를 명확하게 처리
        }

        // 댓글 내용을 수정하고 저장
        existingComment.setContent(updatedComment.getContent());
        Comment savedComment = commentRepository.save(existingComment);
        return new CommentDTO(savedComment);
    }

    /**
     * 주어진 댓글 ID를 바탕으로 댓글을 삭제합니다.
     * @param commentId 댓글의 ID
     */
    public void deleteComment(Long commentId) {
        // 현재 인증된 사용자의 사용자 이름을 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // 댓글 정보를 조회
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found")); // 댓글이 없으면 예외 발생

        // 댓글 작성자가 현재 사용자와 일치하지 않으면 접근 거부
        if (!comment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("권한이 없습니다."); // 권한 오류를 명확하게 처리
        }

        // 댓글 삭제
        commentRepository.delete(comment);
    }
}
