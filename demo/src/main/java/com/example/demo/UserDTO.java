package com.example.demo;

// Lombok 어노테이션을 사용하여 자동으로 getter, setter, 생성자 등을 생성합니다.
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// DTO(Data Transfer Object) 클래스입니다. 사용자 정보를 전송하는데 사용됩니다.
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
public class UserDTO {
    private Long id; // 사용자 ID 필드
    
    private String username; // 사용자 이름 필드
    
    private String password; // 비밀번호 필드
    
    private String employeeId; // 직원 ID 필드
}
