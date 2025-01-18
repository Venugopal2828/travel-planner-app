package com.example.repository;

import com.example.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
	
    // Add any custom queries if needed
}
