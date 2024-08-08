package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Record")
@Getter
@Setter
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 글번호 (최신일수록 작음)

    @Column(nullable = false)
    private String title; // 글 제목

    @Column(nullable = false)
    private String content; // 글 내용

    @Column(nullable = false)
    private LocalDateTime createdAt; // 작성 날짜

    @Column(nullable = false)
    private String username; // 작성자 아이디
}
