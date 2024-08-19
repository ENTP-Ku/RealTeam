package com.example.demo;

import java.util.List; // 리스트를 사용하기 위한 import
import org.springframework.data.jpa.repository.JpaRepository; // JPA 리포지토리 클래스를 사용하기 위한 import

// Comment 엔티티에 대한 JPA 리포지토리 인터페이스
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 주어진 게시글 ID로 모든 댓글을 삭제하는 메서드
    void deleteByRecordId(Long recordId);

    // 주어진 게시글 ID로 댓글 리스트를 찾는 메서드
    List<Comment> findByRecordId(Long recordId);
}
