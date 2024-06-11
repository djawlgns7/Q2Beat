package org.bit.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleOAuthService {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    public GoogleOAuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getGoogleUserInfo(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";
        Map<String, String> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("redirect_uri", redirectUri);
        params.put("grant_type", "authorization_code");

        Map<String, String> tokenResponse = restTemplate.postForObject(tokenUrl, params, HashMap.class);
        String accessToken = tokenResponse.get("access_token");

        String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + accessToken);
        return restTemplate.getForObject(userInfoUrl, Map.class, headers);
    }
}
