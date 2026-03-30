package com.chan.ec2test.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                		"https://devops-test-ecru.vercel.app",
            		    "https://devops-test-qi-main-chan0518s-projects.vercel.app",
            		    "https://devops-test-qya26254d-chan0518s-projects.vercel.app",
            		    "http://localhost:3000",
            		    "http://127.0.0.1:3000",
            		    "http://localhost:5173",
            		    "http://127.0.0.1:5173"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}