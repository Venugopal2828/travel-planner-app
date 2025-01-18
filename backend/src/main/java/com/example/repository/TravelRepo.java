package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Travel;

public interface TravelRepo extends JpaRepository<Travel, Integer>
{}


