package com.gym.gymmanagement.service;

import com.gym.gymmanagement.model.Role;
import com.gym.gymmanagement.model.User;
import com.gym.gymmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Map<String, Object> register(Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String username = request.get("username");
        String password = request.get("password");
        String email = request.get("email");
        String phone = request.getOrDefault("phone", "");

        if (username == null || password == null || email == null) {
            response.put("success", false);
            response.put("message", "Username, password and email are required.");
            return response;
        }

        if (userRepository.existsByUsername(username)) {
            response.put("success", false);
            response.put("message", "Username already exists.");
            return response;
        }

        if (userRepository.existsByEmail(email)) {
            response.put("success", false);
            response.put("message", "Email already registered.");
            return response;
        }

        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .phone(phone)
                .role(Role.USER)
                .build();

        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Registration successful!");
        return response;
    }

    public Map<String, Object> login(Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String username = request.get("username");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid username or password.");
            return response;
        }

        User user = userOpt.get();
        response.put("success", true);
        response.put("message", "Login successful!");
        response.put("role", user.getRole().name());
        response.put("username", user.getUsername());
        response.put("userId", user.getId());
        return response;
    }
}
