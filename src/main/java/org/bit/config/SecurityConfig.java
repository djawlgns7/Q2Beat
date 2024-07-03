package org.bit.config;

import org.bit.adminservice.AdminUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.security.web.session.SimpleRedirectInvalidSessionStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AdminUserDetailsService adminUserDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(adminUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/api/admLogin", "/api/admLogout").permitAll()
                    .antMatchers("/api/notices/**").hasRole("ADMIN")
                    .antMatchers("/api/qna/answer/**", "/api/qna/hide/**", "/api/qna/unhide/**").hasRole("ADMIN")
                    .anyRequest().permitAll()
                .and()
                .formLogin()
                    .loginPage("/login").permitAll()
                    .loginProcessingUrl("/api/admLogin")
                    .defaultSuccessUrl("/")
                .and()
                .logout()
                    .logoutUrl("/api/admLogout")
                    .logoutSuccessUrl("/login")
                .and()
                .sessionManagement()
                    .sessionFixation().migrateSession()
                    .maximumSessions(1).sessionRegistry(sessionRegistry())
                .and()
                .invalidSessionStrategy(new SimpleRedirectInvalidSessionStrategy
                        ("/login?invalid-session=true"));
        http.addFilterBefore(new SessionIdHeaderFilter(), SessionManagementFilter.class);
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
}
