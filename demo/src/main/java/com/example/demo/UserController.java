package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public void register(@RequestBody UserDTO userDTO) throws Exception {
        userService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public void login(@RequestBody UserDTO userDTO) throws Exception {
        userService.authenticate(userDTO.getId(), userDTO.getPassword());
    }
}
