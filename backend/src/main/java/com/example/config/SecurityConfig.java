package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/user/signup/**",
                    "/user/signin/**",
                    "/api/buses/bookings/create",
                    "/login/**",
                    "/gettravel/**",
                    "/api/cabs/bookings/create",
                    "/api/flights/bookings/create",
                    "/api/hotels/bookings/create",
                    "/api/payment/create-checkout-session",
                    "api/payment/save-cart",
                    "/api/trains/bookings/create",
                    "api/bookings/**",
                    "/api/bookings/bus","/api/bookings/flight","/api/bookings/train","/api/bookings/hotel"
                ).permitAll() // Allow these endpoints without authentication
                .anyRequest().authenticated() // Require authentication for all other endpoints
            )
            .httpBasic(httpBasic -> {}).cors(); // Enable Basic Authentication

        return http.build(); // Build the filter chain
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Password encoder bean
    }
    

}
