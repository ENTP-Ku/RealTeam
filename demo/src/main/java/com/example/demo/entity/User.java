package com.example.demo.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Transient;

@Data
@Entity
@Table(name = "List")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String uniqueNumber;

    @Transient
    private String confirmPassword; // 비밀번호 확인 필드, 데이터베이스에는 저장되지 않음
}
