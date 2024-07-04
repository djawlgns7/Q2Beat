package org.bit.adminservice;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.AdminMapper;
import org.bit.model.Q2Notice.Admin;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminMapper adminMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminMapper.findByUsername(username);
        if(admin == null) {
            throw new UsernameNotFoundException(username + "admin not found");
        }
        return new User(admin.getAdmin_username(),
                        admin.getAdmin_password(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }
}
