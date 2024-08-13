package com.example.demo;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
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
}
