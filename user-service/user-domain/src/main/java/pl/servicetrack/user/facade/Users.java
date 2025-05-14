package pl.servicetrack.user.facade;

import io.vavr.control.Either;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.servicetrack.BaseError;
import pl.servicetrack.security.JwtService;
import pl.servicetrack.user.db.UserRepository;
import pl.servicetrack.user.error.UserDomainError;
import pl.servicetrack.user.model.User;

import java.util.Objects;
import java.util.UUID;

public class Users {

    private final UserRepository userRepository;
    private final UserMapper USER_MAPPER = UserMapper.INSTANCE;
    private final PasswordEncoder passwordEncoder;

    public Users(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Either<BaseError, User> register(User user) {
        if (userRepository.exists(user.email())) {
            return Either.left(new UserDomainError.UserAlreadyExists());
        }

        return userRepository.save(USER_MAPPER.userToUserEntity(user), passwordEncoder)
                .map(response -> user);
    }

    public Either<BaseError, User> updateUser(User user) {
        return userRepository.update(USER_MAPPER.userToUserEntity(user), passwordEncoder)
                .map(response -> user);
    }

    public Either<BaseError, String> login(
            String email,
            String password,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        return userRepository.findByEmail(email)
                .filterOrElse(Objects::nonNull, error -> new UserDomainError.UserNotFound())
                .map(user -> {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.email(), password));
                    return jwtService.generateToken(USER_MAPPER.userEntityToUser(user));
                });
    }

    public Either<BaseError, User> fetchUser(UUID userId) {
        return userRepository.findByUserId(userId)
                .filterOrElse(
                        Objects::nonNull,
                        error -> new UserDomainError.UserNotFound()
                )
                .map(USER_MAPPER::userEntityToUser);
    }

    public Either<BaseError, User> fetchUserByEmail(String email) {
        return userRepository.findByEmail(email).map(userEntity -> new User(
                userEntity.id(),
                userEntity.firstName(),
                userEntity.lastName(),
                userEntity.password(),
                userEntity.email(),
                userEntity.phoneNumber(),
                User.Role.valueOf(userEntity.role().toString()),
                userEntity.createdAt())
        );
    }
}
