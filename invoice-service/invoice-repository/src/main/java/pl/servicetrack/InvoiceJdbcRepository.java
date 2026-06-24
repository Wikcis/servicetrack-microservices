package pl.servicetrack;

import io.vavr.control.Either;
import io.vavr.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import pl.servicetrack.db.InvoiceRepository;
import pl.servicetrack.db.error.InvoiceError;
import pl.servicetrack.db.model.InvoiceEntity;

import java.util.List;
import java.util.UUID;

import static pl.servicetrack.InvoiceQuery.*;

public class InvoiceJdbcRepository implements InvoiceRepository {

    private final String FAILED_TO_SAVE_INVOICE = "Failed to save invoice!";
    private final String SUCCESSFULLY_SAVED_INVOICE = "Successfully saved invoice!";
    private final String FAILED_TO_UPDATE_INVOICE = "Failed to update invoice!";
    private final String SUCCESSFULLY_UPDATED_INVOICE = "Successfully updated invoice!";
    private final String FAILED_TO_FETCH_INVOICE = "Failed to fetch invoice!";
    private final String SUCCESSFULLY_FETCHED_INVOICE = "Successfully fetched invoice!";
    private final String FAILED_TO_FETCH_INVOICES = "Failed to fetch invoices!";
    private final String SUCCESSFULLY_FETCHED_INVOICES = "Successfully fetched invoices!";
    private final String FAILED_TO_DELETE_INVOICE = "Failed to delete invoice!";
    private final String SUCCESSFULLY_DELETED_INVOICE = "Successfully deleted invoice!";
    private final InvoiceMapper INVOICE_MAPPER = new InvoiceMapper();
    public final JdbcTemplate jdbcTemplate;
    public final Logger LOGGER = LoggerFactory.getLogger(InvoiceJdbcRepository.class);

    public InvoiceJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Either<BaseError, InvoiceEntity> save(InvoiceEntity invoiceEntity) {
        return attemptSave(invoiceEntity).onFailure(error -> LOGGER.warn(FAILED_TO_SAVE_INVOICE, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_SAVED_INVOICE)).toEither().map(value -> invoiceEntity)
                .mapLeft(error -> new InvoiceError.FailedToSaveInvoiceError());
    }

    public Either<BaseError, InvoiceEntity> update(InvoiceEntity invoiceEntity) {
        return attemptUpdate(invoiceEntity).onFailure(error -> LOGGER.warn(FAILED_TO_UPDATE_INVOICE, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_UPDATED_INVOICE)).toEither().map(value -> invoiceEntity)
                .mapLeft(error -> new InvoiceError.FailedToSaveInvoiceError());
    }

    public Either<BaseError, List<InvoiceEntity>> findAll() {
        return Try.of(() -> jdbcTemplate.query(FETCH_INVOICES, INVOICE_MAPPER)).onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_INVOICES, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_INVOICES)).toEither()
                .mapLeft(error -> new InvoiceError.FailedToFetchInvoiceError());
    }

    public Either<BaseError, InvoiceEntity> find(UUID invoiceId) {
        return Try.of(() -> jdbcTemplate.queryForObject(FETCH_INVOICE, INVOICE_MAPPER, invoiceId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_FETCH_INVOICE, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_FETCHED_INVOICE)).toEither()
                .mapLeft(error -> new InvoiceError.DatabaseReadUnsuccessfulError());
    }

    public Either<BaseError, UUID> delete(UUID invoiceId) {
        return Try.of(() -> jdbcTemplate.update(DELETE_INVOICE, invoiceId))
                .onFailure(error -> LOGGER.warn(FAILED_TO_DELETE_INVOICE, error))
                .onSuccess(success -> LOGGER.info(SUCCESSFULLY_DELETED_INVOICE))
                .toEither()
                .map(value -> invoiceId)
                .mapLeft(error -> new InvoiceError.FailedToDeleteInvoiceError());
    }

    private Try<Integer> attemptSave(InvoiceEntity invoiceEntity) {
        return Try.of(() -> jdbcTemplate.update(SAVE_INVOICE,
                invoiceEntity.id(),
                invoiceEntity.serviceOrderId(),
                invoiceEntity.amount(),
                invoiceEntity.issueDate()
        ));
    }

    private Try<Integer> attemptUpdate(InvoiceEntity invoiceEntity) {
        return Try.of(() -> jdbcTemplate.update(UPDATE_INVOICE,
                invoiceEntity.serviceOrderId(),
                invoiceEntity.amount(),
                invoiceEntity.issueDate(),
                invoiceEntity.id()
        ));
    }
}