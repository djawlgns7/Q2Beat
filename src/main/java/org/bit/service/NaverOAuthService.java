package org.bit.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class NaverOAuthService {

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    @Value("${naver.redirect.uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    public NaverOAuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getNaverUserInfo(String code, String state) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + code + "&state=" + state;
        Map<String, String> tokenResponse = restTemplate.postForObject(tokenUrl, null, HashMap.class);
        String accessToken = tokenResponse.get("access_token");

        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + accessToken);
        return restTemplate.getForObject(userInfoUrl, Map.class, headers);
    }
}
