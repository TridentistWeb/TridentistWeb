package com.utp.tridentist.controller;

import com.utp.tridentist.dto.LoginRequest;
import com.utp.tridentist.dto.LoginResponse;
import com.utp.tridentist.model.Administrador;
import com.utp.tridentist.repository.AdministradorRepository;
import com.utp.tridentist.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody LoginRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(authRequest.getEmail());
            Administrador admin = administradorRepository.findByEmail(authRequest.getEmail()).orElse(null);
            
            if (admin != null) {
                return ResponseEntity.ok(new LoginResponse(token, admin.getEmail(), admin.getNombres(), admin.getApellidos()));
            }
        }
        throw new UsernameNotFoundException("invalid user request !");
    }

    // Helper endpoint to create an initial admin, to be removed or secured later
    @PostMapping("/setup")
    public ResponseEntity<?> createInitialAdmin(@RequestBody Administrador admin) {
        if(administradorRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        administradorRepository.save(admin);
        return ResponseEntity.ok("Admin created");
    }
}
