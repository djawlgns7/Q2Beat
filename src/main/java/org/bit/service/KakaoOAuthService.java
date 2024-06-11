package org.bit.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoOAuthService {

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    public KakaoOAuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getKakaoUserInfo(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        Map<String, String> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("client_id", clientId);
        params.put("redirect_uri", redirectUri);
        params.put("code", code);

        Map<String, String> tokenResponse = restTemplate.postForObject(tokenUrl, params, HashMap.class);
        String accessToken = tokenResponse.get("access_token");

        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + accessToken);
        return restTemplate.getForObject(userInfoUrl, Map.class, headers);
    }
}
