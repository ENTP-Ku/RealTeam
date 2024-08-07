package com.example.demo.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Record")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 글번호

    private String title;
    private String content;
    private LocalDateTime createdDate;
    private String username; // 작성자 아이디
    private String password;
}
