package com.campus.service;

import com.campus.dto.ResourceDTO;
import com.campus.entity.Resource;
import com.campus.enums.ResourceStatus;
import com.campus.exception.ResourceNotFoundException;
import com.campus.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceService {
    
    private final ResourceRepository resourceRepository;
    
    @Transactional
    public ResourceDTO createResource(ResourceDTO resourceDTO) {
        Resource resource = mapToEntity(resourceDTO);
        Resource savedResource = resourceRepository.save(resource);
        return mapToDTO(savedResource);
    }
    
    @Transactional(readOnly = true)
    public List<ResourceDTO> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ResourceDTO getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        return mapToDTO(resource);
    }
    
    @Transactional
    public ResourceDTO updateResource(Long id, ResourceDTO resourceDTO) {
        Resource existingResource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        
        existingResource.setName(resourceDTO.getName());
        existingResource.setType(resourceDTO.getType());
        existingResource.setCapacity(resourceDTO.getCapacity());
        existingResource.setStatus(resourceDTO.getStatus());
        
        Resource updatedResource = resourceRepository.save(existingResource);
        return mapToDTO(updatedResource);
    }
    
    @Transactional
    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public List<ResourceDTO> getResourcesByStatus(ResourceStatus status) {
        return resourceRepository.findByStatus(status).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    private ResourceDTO mapToDTO(Resource resource) {
        return new ResourceDTO(
                resource.getId(),
                resource.getName(),
                resource.getType(),
                resource.getCapacity(),
                resource.getStatus(),
                resource.getCreatedAt(),
                resource.getUpdatedAt()
        );
    }
    
    private Resource mapToEntity(ResourceDTO resourceDTO) {
        return new Resource(
                resourceDTO.getId(),
                resourceDTO.getName(),
                resourceDTO.getType(),
                resourceDTO.getCapacity(),
                resourceDTO.getStatus(),
                null,
                null
        );
    }
}
