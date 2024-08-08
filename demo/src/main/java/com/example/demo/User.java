package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "List") // 테이블 이름을 'List'로 설정
public class User {
    @Id
    private String id; // 사용자 아이디
    private String password; // 암호화된 비밀번호
    private String uniqueNumber; // 고유번호
}
