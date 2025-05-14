package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.TechnicianJdbcRepository;
import pl.servicetrack.db.TechnicianRepository;

@Configuration
public class TechnicianRepositoryConfiguration {

    @Bean
    TechnicianRepository technicianDatabaseRepository(JdbcTemplate jdbcTemplate){
        return new TechnicianJdbcRepository(jdbcTemplate);
    }
}
