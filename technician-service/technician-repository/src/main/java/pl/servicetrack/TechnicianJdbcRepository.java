package pl.servicetrack;

import io.vavr.control.Either;
import io.vavr.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.db.TechnicianRepository;
import pl.servicetrack.db.error.TechnicianError;
import pl.servicetrack.db.model.TechnicianEntity;

import java.util.List;
import java.util.UUID;

import static pl.servicetrack.TechnicianQuery.*;

public class TechnicianJdbcRepository implements TechnicianRepository {

    private final static String FAILED_TO_SAVE_TECHNICIAN = "Failed to save technician!";
    private final static String SUCCESSFULLY_SAVED_TECHNICIAN = "Successfully saved technician!";
    private final static String FAILED_TO_UPDATE_TECHNICIAN = "Failed to update technician!";
    private final static String SUCCESSFULLY_UPDATED_TECHNICIAN = "Successfully updated technician!";
    private final static String FAILED_TO_FETCH_TECHNICIANS = "Failed to fetch technicians!";
    private final static String SUCCESSFULLY_FETCHED_TECHNICIANS = "Successfully fetched technicians!";
    private final static String FAILED_TO_FETCH_TECHNICIAN = "Failed to fetch technician!";
    private final static String SUCCESSFULLY_FETCHED_TECHNICIAN = "Successfully fetched technician!";
    private final static String FAILED_TO_DELETE_TECHNICIAN = "Failed to delete technician!";
    private final static String SUCCESSFULLY_DELETED_TECHNICIAN = "Successfully deleted technician!";
    private final TechnicianMapper TECHNICIAN_MAPPER = new TechnicianMapper();
    private final JdbcTemplate jdbcTemplate;
    private final Logger LOGGER = LoggerFactory.getLogger(TechnicianJdbcRepository.class);

    public TechnicianJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Either<BaseError, TechnicianEntity> save(TechnicianEntity technicianEntity) {
        return attemptSave(technicianEntity)
                .onFailure(error -> LOGGER.warn(FAILED_TO_SAVE_TECHNICIAN, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_SAVED_TECHNICIAN))
                .toEither()
                .map(value -> technicianEntity)
                .mapLeft(error -> new TechnicianError.FailedtoSaveTechnicianError());
    }

    public Either<BaseError, TechnicianEntity> update(TechnicianEntity technicianEntity) {
        return attemptUpdate(technicianEntity)
                .onFailure(error -> LOGGER.warn(FAILED_TO_UPDATE_TECHNICIAN, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_UPDATED_TECHNICIAN))
                .toEither()
                .map(value -> technicianEntity)
                .mapLeft(error -> new TechnicianError.FailedtoSaveTechnicianError());
    }

    public Either<BaseError, List<TechnicianEntity>> findAll() {
        return Try.of(() -> jdbcTemplate.query(FETCH_TECHNICIANS, TECHNICIAN_MAPPER))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_TECHNICIANS, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_TECHNICIANS))
                .toEither()
                .mapLeft(error -> new TechnicianError.DatabaseReadUnsuccessfulError());
    }

    public Either<BaseError, TechnicianEntity> find(UUID technicianId) {
        return Try.of(() -> jdbcTemplate.queryForObject(FETCH_TECHNICIAN, TECHNICIAN_MAPPER, technicianId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_TECHNICIAN, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_TECHNICIAN))
                .toEither()
                .mapLeft(error -> new TechnicianError.FailedtoFetchTechnicianError());
    }

    public Either<BaseError, UUID> delete(UUID technicianId) {
        return Try.of(() -> jdbcTemplate.update(DELETE_TECHNICIAN, technicianId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_DELETE_TECHNICIAN, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_DELETED_TECHNICIAN))
                .toEither()
                .map(value -> technicianId)
                .mapLeft(error -> new TechnicianError.FailedToDeleteTechnicianError());
    }

    private Try<Integer> attemptSave(TechnicianEntity technicianEntity) {
        return Try.of(() -> jdbcTemplate.update(SAVE_TECHNICIAN,
                technicianEntity.id(),
                technicianEntity.userId(),
                technicianEntity.firstName(),
                technicianEntity.lastName(),
                technicianEntity.email(),
                technicianEntity.phoneNumber()
        ));
    }

    private Try<Integer> attemptUpdate(TechnicianEntity technicianEntity) {
        return Try.of(() -> jdbcTemplate.update(UPDATE_TECHNICIAN,
                technicianEntity.firstName(),
                technicianEntity.lastName(),
                technicianEntity.email(),
                technicianEntity.phoneNumber(),
                technicianEntity.id()
        ));
    }
}
