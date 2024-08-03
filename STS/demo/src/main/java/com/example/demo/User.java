package com.example.demo;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "List") // MySQL의 테이블 이름을 'List'로 설정
@Data // Lombok을 사용하여 getter, setter, toString, equals, hashCode 메서드를 자동으로 생성
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String uniqueNumber;
}
