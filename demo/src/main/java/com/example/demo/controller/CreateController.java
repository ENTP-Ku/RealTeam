package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Controller
public class CreateController {

    private final UserRepository userRepository;

    public CreateController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/create")
    public String create() {
        return "create";
    }

    @PostMapping("/create")
    public String registerUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String passwordConfirm,
            @RequestParam String uniqueCode,
            RedirectAttributes redirectAttributes) {

        if (!password.equals(passwordConfirm)) {
            redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다.");
            return "redirect:/create";
        }

        if (userRepository.findByUsername(username).isPresent()) {
            redirectAttributes.addFlashAttribute("error", "이미 존재하는 아이디입니다.");
            return "redirect:/create";
        }

        if (userRepository.findByUniqueCode(uniqueCode).isPresent()) {
            redirectAttributes.addFlashAttribute("error", "이미 가입되어 있습니다.");
            return "redirect:/create";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setUniqueCode(uniqueCode);
        userRepository.save(user);

        redirectAttributes.addFlashAttribute("message", "환영합니다. 로그인 후 이용해주세요");
        return "redirect:/login";
    }
}
