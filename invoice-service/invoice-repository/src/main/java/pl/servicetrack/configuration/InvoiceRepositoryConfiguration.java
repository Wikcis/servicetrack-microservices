package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.InvoiceJdbcRepository;
import pl.servicetrack.db.InvoiceRepository;

@Configuration
public class InvoiceRepositoryConfiguration {

    @Bean
    InvoiceRepository invoiceRepository(JdbcTemplate jdbcTemplate) {
        return new InvoiceJdbcRepository(jdbcTemplate);
    }
}