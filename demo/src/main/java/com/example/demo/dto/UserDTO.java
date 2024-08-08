package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String username; // 사용자 이름
    private String password; // 비밀번호
    private String confirmPassword; // 비밀번호 확인
    private String uniqueId; // 고유번호
}
