package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter // Lombok을 사용하여 getter 메서드를 자동 생성
@Setter // Lombok을 사용하여 setter 메서드를 자동 생성
@Entity // JPA 엔티티로 설정
@Table(name = "List") // 테이블 이름을 'List'로 설정
public class User {
    @Id // 기본 키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임
    private Long id;

    @Column(nullable = false, unique = true) // 필수 입력 필드이자 유니크 설정
    private String username;

    @Column(nullable = false) // 필수 입력 필드 설정
    private String password;

    @Column(nullable = false, unique = true) // 필수 입력 필드이자 유니크 설정
    private String uniqueNumber;
}
