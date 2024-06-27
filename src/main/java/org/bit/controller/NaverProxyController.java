package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/naver")
@PropertySource("classpath:naver.properties")
@RequiredArgsConstructor
public class NaverProxyController {

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    private final RestTemplate restTemplate;

    @GetMapping("/user-info")
    public ResponseEntity<String> getUserInfo(@RequestParam String accessToken) {
        String url = "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response;
    }

    @PostMapping("/speech-to-text")
    public String recognizeAudio(@RequestParam("file") MultipartFile file) throws IOException {

        // 네이버 음성 인식 API 엔드포인트 URL
        String apiUrl = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor";

        // API 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", naverClientId);
        headers.set("X-NCP-APIGW-API-KEY", naverClientSecret);
        headers.set("Content-Type", "application/octet-stream");

        System.out.println(naverClientId + "1111111111111111111" + naverClientSecret);

        // MultipartFile을 ByteArrayResource로 변환
        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // API 요청 엔터티 생성
        HttpEntity<ByteArrayResource> requestEntity = new HttpEntity<>(contentsAsResource, headers);

        // API 호출
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        // 응답 처리
        return response.getBody();
    }
}