package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.ClientJdbcRepository;
import pl.servicetrack.db.ClientRepository;

@Configuration
public class ClientRepositoryConfiguration {

    @Bean
    ClientRepository clientRepository(JdbcTemplate jdbcTemplate) {
        return new ClientJdbcRepository(jdbcTemplate);
    }
}
