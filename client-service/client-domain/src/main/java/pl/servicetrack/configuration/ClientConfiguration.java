package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.servicetrack.db.ClientRepository;
import pl.servicetrack.facade.Clients;

@Configuration
public class ClientConfiguration {

    @Bean
    Clients clients(ClientRepository clientRepository) {
        return new Clients(clientRepository);
    }
}
