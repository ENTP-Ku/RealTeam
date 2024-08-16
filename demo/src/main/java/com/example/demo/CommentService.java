package com.example.demo;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommentDTO> getComments(Long recordId) {
        List<Comment> comments = commentRepository.findByRecordId(recordId);
        return comments.stream().map(CommentDTO::new).collect(Collectors.toList());
    }

    public CommentDTO addComment(Long recordId, Comment comment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        comment.setRecord(record);
        comment.setUser(user);

        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(savedComment);
    }

    public CommentDTO updateComment(Long commentId, Comment updatedComment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!existingComment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("권한이 없습니다."); // 권한 오류를 명확하게 처리
        }

        existingComment.setContent(updatedComment.getContent());
        Comment savedComment = commentRepository.save(existingComment);
        return new CommentDTO(savedComment);
    }

    public void deleteComment(Long commentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("권한이 없습니다."); // 권한 오류를 명확하게 처리
        }

        commentRepository.delete(comment);
    }
}

