package pl.servicetrack;

import io.vavr.control.Either;
import io.vavr.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.db.ServiceOrderRepository;
import pl.servicetrack.db.error.ServiceOrderError;
import pl.servicetrack.db.model.ServiceOrderEntity;

import java.util.List;
import java.util.UUID;

import static org.springframework.dao.support.DataAccessUtils.singleResult;
import static pl.servicetrack.ServiceOrderQuery.*;

public class ServiceOrderJdbcRepository implements ServiceOrderRepository {

    private final static String FAILED_TO_SAVE_SERVICEORDER = "Failed to save service order!";
    private final static String SUCCESSFULLY_SAVED_SERVICEORDER = "Successfully saved service order!";
    private final static String FAILED_TO_UPDATE_SERVICEORDER = "Failed to update service order!";
    private final static String SUCCESSFULLY_UPDATED_SERVICEORDER = "Successfully updated service order!";
    private final static String FAILED_TO_FETCH_SERVICEORDERS = "Failed to fetch service orders!";
    private final static String SUCCESSFULLY_FETCHED_SERVICEORDERS = "Successfully fetched service orders!";
    private final static String FAILED_TO_FETCH_SERVICEORDER = "Failed to fetch service order!";
    private final static String SUCCESSFULLY_FETCHED_SERVICEORDER = "Successfully fetched service order!";
    private final static String FAILED_TO_DELETE_SERVICEORDER = "Failed to delete service order!";
    private final static String SUCCESSFULLY_DELETED_SERVICEORDER = "Successfully deleted service order!";
    private final JdbcTemplate jdbcTemplate;
    private final ServiceOrderMapper SERVICEORDER_MAPPER = new ServiceOrderMapper();
    private final Logger LOGGER = LoggerFactory.getLogger(ServiceOrderJdbcRepository.class);

    public ServiceOrderJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Either<BaseError, ServiceOrderEntity> save(ServiceOrderEntity serviceOrderEntity) {
        return attemptSave(serviceOrderEntity)
                .onFailure(error -> LOGGER.warn(FAILED_TO_SAVE_SERVICEORDER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_SAVED_SERVICEORDER))
                .toEither()
                .map(value -> serviceOrderEntity)
                .mapLeft(error -> new ServiceOrderError.FailedToSaveServiceOrderError());
    }

    public Either<BaseError, ServiceOrderEntity> update(ServiceOrderEntity serviceOrderEntity) {
        return attemptUpdate(serviceOrderEntity)
                .onFailure(error -> LOGGER.warn(FAILED_TO_UPDATE_SERVICEORDER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_UPDATED_SERVICEORDER))
                .toEither()
                .map(value -> serviceOrderEntity)
                .mapLeft(error -> new ServiceOrderError.FailedToSaveServiceOrderError());
    }

    public Either<BaseError, List<ServiceOrderEntity>> findAll() {
        return Try.of(() -> jdbcTemplate.query(FETCH_SERVICEORDERS, SERVICEORDER_MAPPER))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_SERVICEORDERS, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_SERVICEORDERS))
                .toEither()
                .mapLeft(error -> new ServiceOrderError.DatabaseReadUnsuccessfulError());
    }

    public Either<BaseError, ServiceOrderEntity> find(UUID serviceOrderId) {
        return Try.of(() -> singleResult(jdbcTemplate.query(FETCH_SERVICEORDER, SERVICEORDER_MAPPER, serviceOrderId)))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_SERVICEORDER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_SERVICEORDER))
                .toEither()
                .mapLeft(error -> new ServiceOrderError.FailedToFetchTechnicianError());
    }

    public Either<BaseError, UUID> delete(UUID serviceOrderId) {
        return Try.of(() -> jdbcTemplate.update(DELETE_SERVICEORDER, serviceOrderId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_DELETE_SERVICEORDER, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_DELETED_SERVICEORDER))
                .toEither()
                .map(value -> serviceOrderId)
                .mapLeft(error -> new ServiceOrderError.FailedToDeleteServiceOrderError());
    }

    private Try<Integer> attemptSave(ServiceOrderEntity serviceOrderEntity) {
        return Try.of(() -> jdbcTemplate.update(SAVE_SERVICEORDER,
                serviceOrderEntity.id(),
                serviceOrderEntity.technicianId(),
                serviceOrderEntity.clientId(),
                serviceOrderEntity.serviceType().name(),
                serviceOrderEntity.serviceFormat().name(),
                serviceOrderEntity.serviceDescription(),
                serviceOrderEntity.dateTimeOfService(),
                serviceOrderEntity.status().name(),
                serviceOrderEntity.serviceDuration(),
                serviceOrderEntity.comment(),
                serviceOrderEntity.creationDateTime()
        ));
    }

    private Try<Integer> attemptUpdate(ServiceOrderEntity serviceOrderEntity) {
        return Try.of(() -> jdbcTemplate.update(UPDATE_SERVICEORDER,
                serviceOrderEntity.technicianId(),
                serviceOrderEntity.clientId(),
                serviceOrderEntity.serviceType().name(),
                serviceOrderEntity.serviceFormat().name(),
                serviceOrderEntity.serviceDescription(),
                serviceOrderEntity.dateTimeOfService(),
                serviceOrderEntity.status().name(),
                serviceOrderEntity.serviceDuration(),
                serviceOrderEntity.comment(),
                serviceOrderEntity.id()
        ));
    }
}
