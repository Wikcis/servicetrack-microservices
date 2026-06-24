package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.servicetrack.db.InvoiceRepository;
import pl.servicetrack.facade.Invoices;

@Configuration
public class InvoiceConfiguration {

    @Bean
    Invoices invoices(InvoiceRepository invoiceRepository) {
        return new Invoices(invoiceRepository);
    }
}