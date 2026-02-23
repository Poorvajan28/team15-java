package com.campus.repository;

import com.campus.entity.Resource;
import com.campus.enums.ResourceStatus;
import com.campus.enums.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    List<Resource> findByStatus(ResourceStatus status);
    
    List<Resource> findByType(ResourceType type);
}
