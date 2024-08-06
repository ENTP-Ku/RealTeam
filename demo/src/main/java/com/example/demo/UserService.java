package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 사용자 등록
    public void registerUser(User user) {
        userRepository.save(user);
    }

    // 사용자 찾기
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    // 고유번호로 사용자 찾기
    public Optional<User> findByUniqueNumber(String uniqueNumber) {
        return userRepository.findByUniqueNumber(uniqueNumber);
    }
}
