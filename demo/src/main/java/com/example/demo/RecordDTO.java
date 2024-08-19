package com.example.demo;

import lombok.Getter; // Lombok의 Getter 어노테이션을 사용하여 모든 필드에 대한 getter 메서드를 자동 생성합니다.
import lombok.Setter; // Lombok의 Setter 어노테이션을 사용하여 모든 필드에 대한 setter 메서드를 자동 생성합니다.
import lombok.NoArgsConstructor; // Lombok의 NoArgsConstructor 어노테이션을 사용하여 기본 생성자를 자동 생성합니다.
import lombok.AllArgsConstructor; // Lombok의 AllArgsConstructor 어노테이션을 사용하여 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
import java.util.Date; // Java의 Date 클래스를 가져옵니다.

// 데이터 전송 객체(DTO) 클래스입니다. 레코드 정보를 전송하는데 사용됩니다.
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
public class RecordDTO {
    private Long id; // 레코드의 고유 ID 필드
    
    private String title; // 레코드 제목 필드
    
    private String username; // 레코드를 작성한 사용자의 이름 필드
    
    private Date date; // 레코드 작성 날짜 필드
    
    private String content; // 레코드 내용 필드

    // 모든 필드를 매개변수로 하는 생성자를 수동으로 추가합니다.
    public RecordDTO(Long id, String title, String username, Date date, String content) {
        this.id = id; // ID 초기화
        this.title = title; // 제목 초기화
        this.username = username; // 사용자 이름 초기화
        this.date = date; // 날짜 초기화
        this.content = content; // 내용 초기화
    }
}
