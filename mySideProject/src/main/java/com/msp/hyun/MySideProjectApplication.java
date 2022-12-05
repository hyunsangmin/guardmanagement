package com.msp.hyun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class MySideProjectApplication  extends SpringBootServletInitializer{
    // 이 부분 추가
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MySideProjectApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(MySideProjectApplication.class, args);
	}

}
