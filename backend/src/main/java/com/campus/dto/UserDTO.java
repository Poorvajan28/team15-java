package com.campus.dto;

import com.campus.enums.UserRole;
import com.campus.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @NotNull(message = "Role is required")
    private UserRole role;
    
    @NotNull(message = "Status is required")
    private UserStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and Setters for proper JSON deserialization
    public void setRole(String role) {
        if (role != null && !role.isEmpty()) {
            try {
                this.role = UserRole.valueOf(role);
            } catch (IllegalArgumentException e) {
                this.role = null;
            }
        }
    }
    
    public void setStatus(String status) {
        if (status != null && !status.isEmpty()) {
            try {
                this.status = UserStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                this.status = null;
            }
        }
    }
}
