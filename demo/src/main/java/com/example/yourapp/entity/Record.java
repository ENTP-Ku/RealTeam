package com.example.yourapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "Record") // 테이블 이름을 "Record"로 변경
@Getter
@Setter
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(name = "created_date", nullable = false) // 필드 이름을 스네이크 케이스로 변경
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private String username;

    // 비밀번호는 일반적으로 저장하지 않는 것이 좋습니다.
    @Column(nullable = false)
    private String password;
}
