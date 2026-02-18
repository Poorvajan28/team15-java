package com.campus.dto;

import com.campus.enums.BookingStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    
    private Long id;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    private String userName;
    private String userEmail;
    
    @NotNull(message = "Resource ID is required")
    private Long resourceId;
    
    private String resourceName;
    private String resourceType;
    
    @NotNull(message = "Booking date is required")
    private LocalDate bookingDate;
    
    @NotBlank(message = "Time slot is required")
    private String timeSlot;
    
    // Status is not required for creation - server will set it to PENDING
    private BookingStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // String setter for JSON deserialization
    public void setStatus(String status) {
        if (status != null && !status.isEmpty()) {
            try {
                this.status = BookingStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                // Invalid status string, leave as null
                this.status = null;
            }
        }
    }
    
    // Constructor for creating new bookings (without ID and timestamps)
    public BookingDTO(Long userId, Long resourceId, LocalDate bookingDate, String timeSlot) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.bookingDate = bookingDate;
        this.timeSlot = timeSlot;
        this.status = BookingStatus.PENDING;
    }
    
    // Constructor for creating new bookings with status
    public BookingDTO(Long userId, Long resourceId, LocalDate bookingDate, String timeSlot, BookingStatus status) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.bookingDate = bookingDate;
        this.timeSlot = timeSlot;
        this.status = status;
    }
}
