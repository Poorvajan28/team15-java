package com.campus.dto;

import com.campus.enums.ResourceStatus;
import com.campus.enums.ResourceType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDTO {
    
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotNull(message = "Type is required")
    private ResourceType type;
    
    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;
    
    @NotNull(message = "Status is required")
    private ResourceStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // String setters for JSON deserialization
    public void setType(String type) {
        if (type != null && !type.isEmpty()) {
            try {
                this.type = ResourceType.valueOf(type);
            } catch (IllegalArgumentException e) {
                this.type = null;
            }
        }
    }
    
    public void setStatus(String status) {
        if (status != null && !status.isEmpty()) {
            try {
                this.status = ResourceStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                this.status = null;
            }
        }
    }
}
