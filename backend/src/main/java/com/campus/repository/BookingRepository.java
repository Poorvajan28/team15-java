package com.campus.repository;

import com.campus.entity.Booking;
import com.campus.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByStatus(BookingStatus status);
    
    List<Booking> findByUserId(Long userId);
    
    List<Booking> findByResourceId(Long resourceId);
    
    @Query("SELECT b FROM Booking b WHERE b.resource.id = :resourceId AND b.bookingDate = :bookingDate AND b.timeSlot = :timeSlot")
    Optional<Booking> findByResourceIdAndBookingDateAndTimeSlot(
            @Param("resourceId") Long resourceId,
            @Param("bookingDate") LocalDate bookingDate,
            @Param("timeSlot") String timeSlot);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = :status")
    long countByStatus(@Param("status") BookingStatus status);
}
