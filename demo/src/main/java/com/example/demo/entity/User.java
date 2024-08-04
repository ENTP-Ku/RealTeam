package com.example.demo.entity;

import lombok.Data;
import javax.persistence.*;

@Data // Lombok 어노테이션으로 getter, setter 자동 생성
@Entity
@Table(name = "List") // 테이블 이름을 'List'로 설정
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String uniqueCode;
}
