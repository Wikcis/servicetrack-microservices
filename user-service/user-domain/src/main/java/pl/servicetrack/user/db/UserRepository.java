package pl.servicetrack.user.db;

import io.vavr.control.Either;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.servicetrack.BaseError;
import pl.servicetrack.user.db.model.UserEntity;

import java.util.UUID;

public interface UserRepository {

    Either<BaseError, UserEntity> save(UserEntity userEntity, PasswordEncoder passwordEncoder);
    Either<BaseError, UserEntity> update(UserEntity userEntity, PasswordEncoder passwordEncoder);
    Either<BaseError, UserEntity> findByEmail(String username);
    Either<BaseError, UserEntity> findByUserId(UUID userId);
    UserEntity load(String username);
    Boolean exists(String userEmail);
}
