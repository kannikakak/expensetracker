package com.homework.expensetracker.shared.config;

import java.util.Arrays;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {

  private final String[] allowedOrigins;

  public WebCorsConfig(@Value("${FRONTEND_ORIGIN:http://localhost:3000}") String frontendOrigins) {
    this.allowedOrigins = Stream.concat(
      Arrays.stream(frontendOrigins.split(",")),
      Stream.of("http://localhost:3000")
    )
      .map(String::trim)
      .filter(value -> !value.isEmpty())
      .distinct()
      .toArray(String[]::new);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins(allowedOrigins)
      .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
      .allowedHeaders("*")
      .maxAge(3600);
  }
}
