package org.bit.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PythonController {

    @PostMapping("/text/compare")
    public Map<String, Object> compareStrings(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String question = request.get("question").trim();
        String answer = request.get("answer").trim();

        try {
            // 파이썬 스크립트 경로 설정
            File scriptFile = new ClassPathResource("python/grading_twister.py").getFile();

            // 문자열 인코딩
            String encodedQuestion = URLEncoder.encode(question, StandardCharsets.UTF_8.toString());
            String encodedAnswer = URLEncoder.encode(answer, StandardCharsets.UTF_8.toString());

            // ProcessBuilder 설정
            ProcessBuilder processBuilder = new ProcessBuilder("python", scriptFile.getAbsolutePath(), encodedQuestion, encodedAnswer);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            // Python 스크립트의 표준 출력과 표준 오류 출력을 읽기
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream(), StandardCharsets.UTF_8));

            String line;
            StringBuilder output = new StringBuilder();
            StringBuilder errorOutput = new StringBuilder();
            while ((line = stdInput.readLine()) != null) {
                output.append(line);
            }
            while ((line = stdError.readLine()) != null) {
                errorOutput.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                double similarity = Double.parseDouble(output.toString().trim());
                similarity = Math.round(similarity * 100.0) / 100.0;

                response.put("similarity", similarity);
            } else {
                response.put("error", "Failed to calculate similarity");
                response.put("details", errorOutput.toString());
            }
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }

        return response;
    }
}
