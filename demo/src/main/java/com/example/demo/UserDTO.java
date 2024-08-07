package com.example.demo;

import lombok.Getter;
import lombok.Setter;

@Getter // Lombok을 사용하여 getter 메서드를 자동 생성
@Setter // Lombok을 사용하여 setter 메서드를 자동 생성
public class UserDTO {
    private String username;
    private String password;
    private String confirmPassword; // 비밀번호 확인 필드 추가
    private String uniqueNumber;
}
