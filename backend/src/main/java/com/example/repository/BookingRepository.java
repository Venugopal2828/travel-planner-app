package com.example.repository;

import com.example.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Finds all bookings associated with a specific user ID.
     *
     * @param userId the ID of the user whose bookings are to be fetched
     * @return a list of bookings for the given user ID
     */
    List<Booking> findByUser_Id(Long userId);
}


