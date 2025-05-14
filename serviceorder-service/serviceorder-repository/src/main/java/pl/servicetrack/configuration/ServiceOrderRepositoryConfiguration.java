package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.ServiceOrderJdbcRepository;
import pl.servicetrack.db.ServiceOrderRepository;

@Configuration
public class ServiceOrderRepositoryConfiguration {

    @Bean
    ServiceOrderRepository serviceOrderRepository(JdbcTemplate jdbcTemplate) {
        return new ServiceOrderJdbcRepository(jdbcTemplate);
    }
}
