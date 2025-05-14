package pl.servicetrack.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.servicetrack.db.TechnicianRepository;
import pl.servicetrack.facade.Technicians;

@Configuration
public class TechnicianConfiguration {

    @Bean
    Technicians technicians(TechnicianRepository technicianRepository){
        return new Technicians(technicianRepository);
    }
}
