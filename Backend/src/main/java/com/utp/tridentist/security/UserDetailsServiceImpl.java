package com.utp.tridentist.security;

import com.utp.tridentist.model.Administrador;
import com.utp.tridentist.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Administrador admin = administradorRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + username));

        return new User(admin.getEmail(), admin.getPassword(), new ArrayList<>());
    }
}
