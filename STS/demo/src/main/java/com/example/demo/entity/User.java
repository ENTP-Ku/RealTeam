package com.example.demo.entity;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "List")  // 테이블 이름을 'List'로 설정
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(unique = true)
    private String uniqueCode;

    @Transient  // 이 필드는 데이터베이스에 저장되지 않음
    private String confirmPassword;
}
