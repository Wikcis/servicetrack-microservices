package pl.servicetrack.error;

import pl.servicetrack.BaseError;

public interface TechnicianDomainError extends BaseError {

    String TECHNICIAN_NOT_FOUND = "Technician not found in the database";

    record TechnicianNotFound(String message) implements TechnicianDomainError {
        public TechnicianNotFound() {
            this(TECHNICIAN_NOT_FOUND);
        }
    }
}
