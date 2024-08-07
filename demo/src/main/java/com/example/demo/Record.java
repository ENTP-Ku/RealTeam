package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Getter // Lombok을 사용하여 getter 메서드를 자동 생성
@Setter // Lombok을 사용하여 setter 메서드를 자동 생성
@Entity // JPA 엔티티로 설정
public class Record {
    @Id // 기본 키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임
    private Long id;

    @Column(nullable = false) // 필수 입력 필드 설정
    private String title;

    @Column(nullable = false) // 필수 입력 필드 설정
    private String content;

    @Column(nullable = false) // 필수 입력 필드 설정
    private LocalDateTime createdDate = LocalDateTime.now(); // 생성 시각을 현재 시간으로 설정

    @Column(nullable = false) // 필수 입력 필드 설정
    private String username;
}
