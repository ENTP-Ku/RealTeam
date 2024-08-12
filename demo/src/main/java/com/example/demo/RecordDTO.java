package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class RecordDTO {
    private Long id;
    private String title;
    private String username;
    private Date date;
    private String content;

    // 모든 필드를 포함하는 생성자 추가
    public RecordDTO(Long id, String title, String username, Date date, String content) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.date = date;
        this.content = content;
        
    }
}
