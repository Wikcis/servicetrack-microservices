package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.servicetrack.db.ServiceOrderRepository;
import pl.servicetrack.facade.ServiceOrders;

@Configuration
public class ServiceOrderConfiguration {

    @Bean
    ServiceOrders serviceOrders(ServiceOrderRepository serviceOrderRepository) {
        return new ServiceOrders(serviceOrderRepository);
    }
}
