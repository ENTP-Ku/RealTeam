package com.example.demo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String id;
    private String password;
    private String confirmPassword; // 비밀번호 확인 필드
    private String uniqueNumber;
}
