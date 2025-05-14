package pl.servicetrack.error;

import pl.servicetrack.BaseError;

public interface ClientDomainError extends BaseError {

    String CLIENT_NOT_FOUND = "Client not found in the database";

    record ClientNotFound(String message) implements ClientDomainError {
        public ClientNotFound() {
            this(CLIENT_NOT_FOUND);
        }
    }
}
