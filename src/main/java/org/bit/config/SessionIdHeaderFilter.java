package org.bit.config;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SessionIdHeaderFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String sessionId = request.getHeader("X-Session-Id");
        if (sessionId != null && !sessionId.isEmpty()) {
            request.getSession().setAttribute("SESSION_ID", sessionId);
        }

        filterChain.doFilter(request, response);
    }
}