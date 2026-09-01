package com.hbk.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//이 클래스는 서버 설정(Configuration)을 위한 파일이야!
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    //정적 리소스(이미지, 영상, html 등)를 웹에서 어떻게 접근할지 연결해 주는 역할
    public void addResourceHandlers(ResourceHandlerRegistry registry){

        registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:///" + System.getProperty("user.dir") + "/uploads/");

    }

    //CORS
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
.allowedOrigins("http://localhost:3000")
.allowedMethods("GET","POST","PUT", "DELETE", "OPTIONS")
.allowedHeaders("*")
.allowCredentials(true);
    }
}
