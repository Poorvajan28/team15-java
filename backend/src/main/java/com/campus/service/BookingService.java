package com.campus.service;

import com.campus.dto.BookingDTO;
import com.campus.entity.Booking;
import com.campus.entity.Resource;
import com.campus.entity.User;
import com.campus.enums.BookingStatus;
import com.campus.exception.BadRequestException;
import com.campus.exception.ResourceNotFoundException;
import com.campus.repository.BookingRepository;
import com.campus.repository.ResourceRepository;
import com.campus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    
    @Transactional
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Check if user exists
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + bookingDTO.getUserId()));
        
        // Check if resource exists
        Resource resource = resourceRepository.findById(bookingDTO.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + bookingDTO.getResourceId()));
        
        // Check for double booking
        boolean exists = bookingRepository.findByResourceIdAndBookingDateAndTimeSlot(
                bookingDTO.getResourceId(),
                bookingDTO.getBookingDate(),
                bookingDTO.getTimeSlot()
        ).isPresent();
        
        if (exists) {
            throw new BadRequestException("Resource is already booked for this date and time slot");
        }
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setResource(resource);
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setTimeSlot(bookingDTO.getTimeSlot());
        booking.setStatus(BookingStatus.PENDING);
        
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }
    
    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return mapToDTO(booking);
    }
    
    @Transactional
    public BookingDTO updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);
        return mapToDTO(updatedBooking);
    }
    
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    private BookingDTO mapToDTO(Booking booking) {
        if (booking == null) {
            return null;
        }
        
        Long userId = booking.getUser() != null ? booking.getUser().getId() : null;
        String userName = booking.getUser() != null ? booking.getUser().getName() : null;
        String userEmail = booking.getUser() != null ? booking.getUser().getEmail() : null;
        Long resourceId = booking.getResource() != null ? booking.getResource().getId() : null;
        String resourceName = booking.getResource() != null ? booking.getResource().getName() : null;
        String resourceType = booking.getResource() != null && booking.getResource().getType() != null 
                ? booking.getResource().getType().name() : null;
        
        return new BookingDTO(
                booking.getId(),
                userId,
                userName,
                userEmail,
                resourceId,
                resourceName,
                resourceType,
                booking.getBookingDate(),
                booking.getTimeSlot(),
                booking.getStatus(),
                booking.getCreatedAt(),
                booking.getUpdatedAt()
        );
    }
}
