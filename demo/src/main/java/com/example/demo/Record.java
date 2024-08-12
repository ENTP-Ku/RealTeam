package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String username;
    private Date date;

    // 선택적으로, ID를 제외한 필드를 포함하는 생성자를 추가할 수 있습니다
    public Record(String title, String content, String username, Date date) {
        this.title = title;
        this.content = content;
        this.username = username;
        this.date = date;
    }
}
