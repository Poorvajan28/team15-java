package com.campus.dto;

import com.campus.enums.ResourceStatus;
import com.campus.enums.ResourceType;
import com.fasterxml.jackson.annotation.JsonSetter;
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
    
    // Custom setter for JSON deserialization to handle both String and ResourceType
    @JsonSetter("type")
    public void setTypeFromJson(Object type) {
        if (type == null) {
            this.type = null;
        } else if (type instanceof ResourceType) {
            this.type = (ResourceType) type;
        } else if (type instanceof String) {
            String typeStr = (String) type;
            if (!typeStr.isEmpty()) {
                try {
                    this.type = ResourceType.valueOf(typeStr);
                } catch (IllegalArgumentException e) {
                    this.type = null;
                }
            }
        }
    }
    
    // Custom setter for JSON deserialization to handle both String and ResourceStatus
    @JsonSetter("status")
    public void setStatusFromJson(Object status) {
        if (status == null) {
            this.status = null;
        } else if (status instanceof ResourceStatus) {
            this.status = (ResourceStatus) status;
        } else if (status instanceof String) {
            String statusStr = (String) status;
            if (!statusStr.isEmpty()) {
                try {
                    this.status = ResourceStatus.valueOf(statusStr);
                } catch (IllegalArgumentException e) {
                    this.status = null;
                }
            }
        }
    }
}
