package pl.servicetrack.db;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.model.ClientEntity;

import java.util.List;
import java.util.UUID;

public interface ClientRepository {

    Either<BaseError, ClientEntity> save(ClientEntity clientEntity);
    Either<BaseError, ClientEntity> update(ClientEntity clientEntity);
    Either<BaseError, List<ClientEntity>> findAll();
    Either<BaseError, ClientEntity> find(UUID clientId);
    Either<BaseError, UUID> delete(UUID clientId);
}
