package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "List")  // 테이블 이름을 'List'로 지정
public class User {
    @Id
    private String id;  // 사용자 아이디

    private String password;  // 사용자 비밀번호
    private String uniqueNumber;  // 고유번호
}
