package pl.servicetrack;

import io.vavr.control.Either;
import io.vavr.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.servicetrack.user.db.UserRepository;
import pl.servicetrack.user.db.error.UserError;
import pl.servicetrack.user.db.model.UserEntity;

import java.util.UUID;

import static org.springframework.dao.support.DataAccessUtils.singleResult;
import static pl.servicetrack.UserQuery.*;

public class UserJdbcRepository implements UserRepository {

    private final static String FAILED_TO_SAVE_USER = "Failed to save user!";
    private final static String SUCCESSFULLY_SAVED_USER = "Successfully saved user!";
    private final static String FAILED_TO_UPDATE_USER = "Failed to update user!";
    private final static String SUCCESSFULLY_UPDATED_USER = "Successfully updated user!";
    private final static String FAILED_TO_FETCH_USER = "Failed to fetch user!";
    private final static String SUCCESSFULLY_FETCHED_USER = "Successfully fetched user!";
    private final JdbcTemplate jdbcTemplate;
    private final Logger LOGGER = LoggerFactory.getLogger(UserJdbcRepository.class);
    private final UserMapper USER_MAPPER = new UserMapper();

    public UserJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Either<BaseError, UserEntity> save(UserEntity userEntity, PasswordEncoder passwordEncoder) {
        return Try.of(() -> jdbcTemplate.update(SAVE_USER,
                        userEntity.id(),
                        userEntity.firstName(),
                        userEntity.lastName(),
                        passwordEncoder.encode(userEntity.password()),
                        userEntity.email(),
                        userEntity.phoneNumber(),
                        userEntity.role().name(),
                        userEntity.createdAt()))
                .onFailure(error -> LOGGER.warn(FAILED_TO_SAVE_USER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_SAVED_USER))
                .toEither()
                .map(value -> userEntity)
                .mapLeft(error -> new UserError.FailedToSaveToDatabaseError());
    }

    public Either<BaseError, UserEntity> update(UserEntity userEntity, PasswordEncoder passwordEncoder) {
        return Try.of(() -> jdbcTemplate.update(UPDATE_USER,
                        userEntity.firstName(),
                        userEntity.lastName(),
                        passwordEncoder.encode(userEntity.password()),
                        userEntity.email(),
                        userEntity.phoneNumber(),
                        userEntity.id()
                )).onFailure(error -> LOGGER.warn(FAILED_TO_UPDATE_USER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_UPDATED_USER))
                .toEither()
                .map(value -> userEntity)
                .mapLeft(error -> new UserError.FailedToSaveToDatabaseError());
    }


    public Either<BaseError, UserEntity> findByEmail(String email) {
        return Try.of(() -> singleResult(jdbcTemplate.query(FETCH_USER_BY_EMAIL, USER_MAPPER, email)))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_USER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_USER))
                .toEither()
                .mapLeft(error -> new UserError.FailedToFetchUserError());
    }

    @Override
    public Either<BaseError, UserEntity> findByUserId(UUID userId) {
        return Try.of(() -> singleResult(jdbcTemplate.query(FETCH_USER_BY_USER_ID, USER_MAPPER, userId)))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_USER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_USER))
                .toEither()
                .mapLeft(error -> new UserError.FailedToFetchUserError());
    }

    public UserEntity load(String username) {
        return singleResult(jdbcTemplate.query(FETCH_USER_BY_EMAIL, USER_MAPPER, username));
    }

    public Boolean exists(String userEmail) {
        return !jdbcTemplate.query(FETCH_USER_BY_EMAIL, USER_MAPPER, userEmail).isEmpty();
    }

}
