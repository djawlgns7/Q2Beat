package org.bit.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = "org.bit")
@Import(MyBatisConfig.class)
public class RootConfig {
}
