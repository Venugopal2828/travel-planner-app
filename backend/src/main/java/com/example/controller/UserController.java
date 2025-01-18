package com.example.controller;

import com.example.dto.AuthResponse;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.service.JwtTokenProvider;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if the email is already in use
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Encode the password and set it in the user entity
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user and assign userId (same as id)
        userRepository.save(user);
        user.setUserId(user.getId());  // Set userId to the generated id
        userRepository.save(user);  // Save again to persist the userId in the database

        // Return success message with the userId in the response
        return ResponseEntity.ok("User registered successfully  ");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtTokenProvider.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, user.getUserId())); // Correctly passing both token and userId
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }


    @GetMapping("/bookings")
    public ResponseEntity<?> getUserBookings(@RequestHeader("Authorization") String token) {
        // Extract email from JWT token
        String email = jwtTokenProvider.getEmailFromToken(token.replace("Bearer ", ""));
        User user = userService.findByEmail(email);

        // Check if the user is valid
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // Return the user's bookings
        return ResponseEntity.ok(user.getBookings());
    }
}
