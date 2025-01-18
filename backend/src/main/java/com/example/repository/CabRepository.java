package com.example.repository;

import com.example.entity.Cab;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CabRepository extends JpaRepository<Cab, Long> {
    // You can add custom query methods here if needed
}
