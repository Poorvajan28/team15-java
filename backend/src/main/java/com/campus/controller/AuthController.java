package com.campus.controller;

import com.campus.dto.UserDTO;
import com.campus.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Value("${app.supabase.url}")
    private String supabaseUrl;

    @Value("${app.supabase.anon-key}")
    private String supabaseAnonKey;

    @Value("${app.supabase.jwt-secret}")
    private String supabaseJwtSecret;

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            // Authenticate with Supabase
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("apikey", supabaseAnonKey);
            
            Map<String, String> body = new HashMap<>();
            body.put("email", email);
            body.put("password", password);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
            
            String authUrl = supabaseUrl + "/auth/v1/token?grant_type=password";
            ResponseEntity<Map> response = restTemplate.postForEntity(authUrl, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> authResponse = response.getBody();
                String accessToken = (String) authResponse.get("access_token");
                String refreshToken = (String) authResponse.get("refresh_token");
                
                // Get user info from Supabase
                Map<String, Object> userInfo = getUserInfo(accessToken);
                
                Map<String, Object> result = new HashMap<>();
                result.put("access_token", accessToken);
                result.put("refresh_token", refreshToken);
                result.put("user", userInfo);
                
                return ResponseEntity.ok(result);
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Authentication failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");

        try {
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("apikey", supabaseAnonKey);
            
            // Use admin API to create user without email confirmation
            // We'll use the anon key but add email_confirm=true to bypass confirmation
            Map<String, Object> body = new HashMap<>();
            body.put("email", email);
            body.put("password", password);
            body.put("email_confirm", true); // Bypass email confirmation
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            String signupUrl = supabaseUrl + "/auth/v1/admin/users";
            ResponseEntity<Map> response = restTemplate.postForEntity(signupUrl, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.CREATED) {
                return ResponseEntity.ok(Map.of("message", "Registration successful! You can now login."));
            }
            
            // If admin API fails, try regular signup
            Map<String, String> regularBody = new HashMap<>();
            regularBody.put("email", email);
            regularBody.put("password", password);
            HttpEntity<Map<String, String>> regularRequest = new HttpEntity<>(regularBody, headers);
            String regularSignupUrl = supabaseUrl + "/auth/v1/signup";
            ResponseEntity<Map> regularResponse = restTemplate.postForEntity(regularSignupUrl, regularRequest, Map.class);
            
            if (regularResponse.getStatusCode() == HttpStatus.OK || regularResponse.getStatusCode() == HttpStatus.CREATED) {
                return ResponseEntity.ok(Map.of("message", "Registration successful. Please check your email to verify."));
            }
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Registration failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refresh_token");

        try {
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("apikey", supabaseAnonKey);
            
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("refresh_token", refreshToken);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
            
            String refreshUrl = supabaseUrl + "/auth/v1/token?grant_type=refresh_token";
            ResponseEntity<Map> response = restTemplate.postForEntity(refreshUrl, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> authResponse = response.getBody();
                
                return ResponseEntity.ok(Map.of(
                    "access_token", authResponse.get("access_token"),
                    "refresh_token", authResponse.get("refresh_token")
                ));
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Token refresh failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth != null && auth.getPrincipal() instanceof com.campus.config.SupabaseUserPrincipal) {
            com.campus.config.SupabaseUserPrincipal principal = 
                    (com.campus.config.SupabaseUserPrincipal) auth.getPrincipal();
            
            return ResponseEntity.ok(Map.of(
                "userId", principal.getUserId(),
                "email", principal.getEmail() != null ? principal.getEmail() : ""
            ));
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        // Supabase handles logout on client side by removing tokens
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    private Map<String, Object> getUserInfo(String accessToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);
            headers.add("apikey", supabaseAnonKey);
            
            HttpEntity<?> request = new HttpEntity<>(headers);
            
            String userUrl = supabaseUrl + "/auth/v1/user";
            ResponseEntity<Map> response = restTemplate.exchange(userUrl, HttpMethod.GET, request, Map.class);
            
            if (response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            // Return empty map if user info retrieval fails
        }
        return new HashMap<>();
    }
}
