package pl.servicetrack;

import io.vavr.control.Either;
import io.vavr.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.db.ClientRepository;
import pl.servicetrack.db.error.ClientError;
import pl.servicetrack.db.model.ClientEntity;

import java.util.List;
import java.util.UUID;

import static pl.servicetrack.ClientQuery.*;

public class ClientJdbcRepository implements ClientRepository {

    private final String FAILED_TO_SAVE_CLIENT = "Failed to save client!";
    private final String SUCCESSFULLY_SAVED_CLIENT = "Successfully saved client!";
    private final String FAILED_TO_UPDATE_CLIENT = "Failed to update client!";
    private final String SUCCESSFULLY_UPDATED_CLIENT = "Successfully updated client!";
    private final String FAILED_TO_FETCH_CLIENT = "Failed to fetch client!";
    private final String SUCCESSFULLY_FETCHED_CLIENT = "Successfully fetched client!";
    private final String FAILED_TO_FETCH_CLIENTS = "Failed to fetch clients!";
    private final String SUCCESSFULLY_FETCHED_CLIENTS = "Successfully fetched clients!";
    private final String FAILED_TO_DELETE_CLIENT = "Failed to delete client!";
    private final String SUCCESSFULLY_DELETED_CLIENT = "Successfully deleted client!";
    private final ClientMapper CLIENT_MAPPER = new ClientMapper();
    public final JdbcTemplate jdbcTemplate;
    public final Logger LOGGER = LoggerFactory.getLogger(ClientJdbcRepository.class);

    public ClientJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Either<BaseError, ClientEntity> save(ClientEntity clientEntity) {
        return attemptSave(clientEntity).onFailure(error -> LOGGER.warn(FAILED_TO_SAVE_CLIENT, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_SAVED_CLIENT)).toEither().map(value -> clientEntity)
                .mapLeft(error -> new ClientError.FailedToSaveClientError());
    }

    public Either<BaseError, ClientEntity> update(ClientEntity clientEntity) {
        return attemptUpdate(clientEntity).onFailure(error -> LOGGER.warn(FAILED_TO_UPDATE_CLIENT, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_UPDATED_CLIENT)).toEither().map(value -> clientEntity)
                .mapLeft(error -> new ClientError.FailedToSaveClientError());
    }

    public Either<BaseError, List<ClientEntity>> findAll() {
        return Try.of(() -> jdbcTemplate.query(FETCH_CLIENTS, CLIENT_MAPPER)).onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_CLIENTS, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_CLIENTS)).toEither()
                .mapLeft(error -> new ClientError.FailedToFetchTechnicianError());
    }

    public Either<BaseError, ClientEntity> find(UUID clientId) {
        return Try.of(() -> jdbcTemplate.queryForObject(FETCH_CLIENT, CLIENT_MAPPER, clientId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_CLIENT, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_CLIENT)).toEither()
                .mapLeft(error -> new ClientError.DatabaseReadUnsuccessfulError());
    }

    public Either<BaseError, UUID> delete(UUID clientId) {
        return Try.of(() -> jdbcTemplate.update(DELETE_CLIENT, clientId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_DELETE_CLIENT, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_DELETED_CLIENT))
                .toEither()
                .map(value -> clientId)
                .mapLeft(error -> new ClientError.FailedToDeleteClientError());
    }

    private Try<Integer> attemptSave(ClientEntity clientEntity) {
        return Try.of(() -> jdbcTemplate.update(SAVE_CLIENT,
                clientEntity.id(),
                clientEntity.name(),
                clientEntity.email(),
                clientEntity.phoneNumber()
        ));
    }

    private Try<Integer> attemptUpdate(ClientEntity clientEntity) {
        return Try.of(() -> jdbcTemplate.update(UPDATE_CLIENT,
                clientEntity.name(),
                clientEntity.email(),
                clientEntity.phoneNumber(),
                clientEntity.id()
        ));
    }
}
