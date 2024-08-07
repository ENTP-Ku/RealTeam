package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // username으로 사용자 검색
    Optional<User> findByUniqueNumber(String uniqueNumber); // uniqueNumber로 사용자 검색
}
