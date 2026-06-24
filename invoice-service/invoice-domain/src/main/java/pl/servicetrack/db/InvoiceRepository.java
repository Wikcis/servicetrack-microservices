package pl.servicetrack.db;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.model.InvoiceEntity;

import java.util.List;
import java.util.UUID;

public interface InvoiceRepository {

    Either<BaseError, InvoiceEntity> save(InvoiceEntity invoiceEntity);
    Either<BaseError, InvoiceEntity> update(InvoiceEntity invoiceEntity);
    Either<BaseError, List<InvoiceEntity>> findAll();
    Either<BaseError, InvoiceEntity> find(UUID invoiceId);
    Either<BaseError, UUID> delete(UUID invoiceId);
}