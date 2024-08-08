package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "List") // 테이블 이름을 'List'로 변경
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 사용자 ID

    @Column(nullable = false, unique = true)
    private String username; // 사용자 이름

    @Column(nullable = false)
    private String password; // 사용자 비밀번호

    @Column(nullable = false, unique = true)
    private String uniqueId; // 사용자 고유번호

    // 기본 생성자
    public User() {}
    
    // 매개변수를 받는 생성자
    public User(String username, String password, String uniqueId) {
        this.username = username;
        this.password = password;
        this.uniqueId = uniqueId;
    }
}
