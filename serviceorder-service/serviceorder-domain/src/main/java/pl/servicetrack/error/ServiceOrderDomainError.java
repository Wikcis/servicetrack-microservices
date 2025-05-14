package pl.servicetrack.error;

import pl.servicetrack.BaseError;

public interface ServiceOrderDomainError extends BaseError {

    String SERVICEORDER_NOT_FOUND = "Service Order not found in the database";

    record ServiceOrderNotFound(String message) implements ServiceOrderDomainError {
        public ServiceOrderNotFound() {
            this(SERVICEORDER_NOT_FOUND);
        }
    }
}
