package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id); // 사용자 아이디로 검색
    Optional<User> findByUniqueNumber(String uniqueNumber); // 고유번호로 검색
}
