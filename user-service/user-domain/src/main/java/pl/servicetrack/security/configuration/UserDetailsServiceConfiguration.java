package pl.servicetrack.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import pl.servicetrack.user.db.UserRepository;
import pl.servicetrack.user.db.model.UserDetailsImpl;
import pl.servicetrack.user.db.model.UserEntity;
import pl.servicetrack.user.facade.UserMapper;
import pl.servicetrack.user.model.User;

import java.util.UUID;

@Configuration
public class UserDetailsServiceConfiguration {

    @Bean
    UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> {
            UserEntity user = userRepository.load(username);
            return new UserDetailsImpl(new User(
                    user.id(),
                    user.firstName(),
                    user.lastName(),
                    user.password(),
                    user.email(),
                    user.phoneNumber(),
                    User.Role.valueOf(user.role().toString()),
                    user.createdAt()
            ));
        };
    }
}