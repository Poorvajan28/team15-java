package com.campus.dto;

import com.campus.enums.UserRole;
import com.campus.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonSetter;
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
    
    // Custom setter for JSON deserialization to handle both String and UserRole
    @JsonSetter("role")
    public void setRoleFromJson(Object role) {
        if (role == null) {
            this.role = null;
        } else if (role instanceof UserRole) {
            this.role = (UserRole) role;
        } else if (role instanceof String) {
            String roleStr = (String) role;
            if (!roleStr.isEmpty()) {
                try {
                    this.role = UserRole.valueOf(roleStr);
                } catch (IllegalArgumentException e) {
                    this.role = null;
                }
            }
        }
    }
    
    // Custom setter for JSON deserialization to handle both String and UserStatus
    @JsonSetter("status")
    public void setStatusFromJson(Object status) {
        if (status == null) {
            this.status = null;
        } else if (status instanceof UserStatus) {
            this.status = (UserStatus) status;
        } else if (status instanceof String) {
            String statusStr = (String) status;
            if (!statusStr.isEmpty()) {
                try {
                    this.status = UserStatus.valueOf(statusStr);
                } catch (IllegalArgumentException e) {
                    this.status = null;
                }
            }
        }
    }
}
