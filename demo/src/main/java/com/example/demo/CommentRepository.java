package com.example.demo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	void deleteByRecordId(Long recordId); // 삭제 메소드 추가
	List<Comment> findByRecordId(Long recordId);
}
