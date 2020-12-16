package com.cn.yh.config;

import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

/**
 * 错误页面配置
 * @Version: v1.0
 */
@Configuration
public class ErrorPageConfig {

    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return (factory -> {
            ErrorPage errorPage400 = new ErrorPage(HttpStatus.BAD_REQUEST, "/400");
            ErrorPage errorPage404 = new ErrorPage(HttpStatus.NOT_FOUND, "/404");
            ErrorPage errorPage500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500");
            factory.addErrorPages(errorPage404, errorPage500);
        });
    }

}