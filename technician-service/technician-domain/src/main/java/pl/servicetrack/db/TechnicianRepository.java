package pl.servicetrack.db;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.model.TechnicianEntity;

import java.util.List;
import java.util.UUID;

public interface TechnicianRepository {

    Either<BaseError, TechnicianEntity> save(TechnicianEntity technicianEntity);
    Either<BaseError, TechnicianEntity> update(TechnicianEntity technicianEntity);
    Either<BaseError, TechnicianEntity> find(UUID technicianId);
    Either<BaseError, UUID> delete(UUID technicianId);
    Either<BaseError, List<TechnicianEntity>> findAll();
}