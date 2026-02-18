package com.campus.service;

import com.campus.dto.DashboardDTO;
import com.campus.enums.BookingStatus;
import com.campus.repository.BookingRepository;
import com.campus.repository.ResourceRepository;
import com.campus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final BookingRepository bookingRepository;
    
    @Transactional(readOnly = true)
    public DashboardDTO getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalResources = resourceRepository.count();
        long totalBookings = bookingRepository.count();
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long approvedBookings = bookingRepository.countByStatus(BookingStatus.APPROVED);
        long rejectedBookings = bookingRepository.countByStatus(BookingStatus.REJECTED);
        
        return new DashboardDTO(
                totalUsers,
                totalResources,
                totalBookings,
                pendingBookings,
                approvedBookings,
                rejectedBookings
        );
    }
}
