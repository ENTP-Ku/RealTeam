package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String employeeId;

    // 생성자 추가: id를 제외한 모든 필드를 포함
    public User(String username, String password, String employeeId) {
        this.username = username;
        this.password = password;
        this.employeeId = employeeId;
    }
}
