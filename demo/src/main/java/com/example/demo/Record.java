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

    // 롬복으로 생성자를 자동 생성하지 않으므로 수동으로 추가
    public Record(String title, String content, String username, Date date) {
        this.title = title;
        this.content = content;
        this.username = username;
        this.date = date;
    }

    // ID만 초기화하는 생성자
    public Record(Long id) {
        this.id = id;
    }
}
