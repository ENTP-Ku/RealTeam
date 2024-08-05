// src/main/java/com/example/demo/repository/UserRepository.java
package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 사용자 이름으로 사용자 찾기
    Optional<User> findByUsername(String username);

    // 사용자 이름 존재 여부 확인
    boolean existsByUsername(String username);

    // 고유 번호 존재 여부 확인
    boolean existsByUniqueCode(String uniqueCode);
}
