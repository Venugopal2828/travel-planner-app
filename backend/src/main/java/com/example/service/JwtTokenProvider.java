package com.example.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.example.entity.User;

import java.util.Date;

@Service
public class JwtTokenProvider {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a secure key

    // Method to generate the JWT token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail()) // Subject is the email in this case
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration time
                .signWith(secretKey) // Sign the token with the secret key
                .compact();
    }

    // Method to validate the token
    public String validateToken(String token) {
        return Jwts.parserBuilder() // Parse the token with the secret key
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // Return the subject (email in this case)
    }

    // Method to extract email from the token
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder() // Parse the JWT token
                .setSigningKey(secretKey) // Secret key used to sign the token
                .build()
                .parseClaimsJws(token)
                .getBody(); // Get the body of the token (claims)
        
        return claims.getSubject(); // The email is stored in the subject of the JWT
    }
}
