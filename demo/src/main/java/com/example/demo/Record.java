package com.example.demo;

import lombok.Data;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Record")  // 테이블 이름을 'Record'로 설정
@Data  // Lombok 어노테이션으로 getter, setter 생성
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;  // 게시글 번호
    private String title;  // 제목
    private String content;  // 내용
    private LocalDateTime createdDate;  // 작성 날짜
    private String userId;  // 작성자 아이디
}
