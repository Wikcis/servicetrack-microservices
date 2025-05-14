package pl.servicetrack.db.error;

import pl.servicetrack.BaseError;

public interface ClientError extends BaseError {

    String FAILED_TO_SAVE_TO_DATABASE = "Failed to save entity to the database";
    String FAILED_TO_FETCH_CLIENT = "Failed to fetch entity to the database";
    String UNSUCCESSFUL_DATABASE_READ = "The attempt to read from the database was unsuccessful";
    String FAILED_TO_DELETE_CLIENT = "Failed to delete serviceOrder from the database";

    record FailedToSaveClientError(String message) implements ClientError {
        public FailedToSaveClientError() {
            this(FAILED_TO_SAVE_TO_DATABASE);
        }
    }

    record FailedToFetchTechnicianError(String message) implements ClientError {
        public FailedToFetchTechnicianError() {
            this(FAILED_TO_FETCH_CLIENT);
        }
    }

    record DatabaseReadUnsuccessfulError(String message) implements ClientError {
        public DatabaseReadUnsuccessfulError() {
            this(UNSUCCESSFUL_DATABASE_READ);
        }
    }

    record FailedToDeleteClientError(String message) implements ClientError {
        public FailedToDeleteClientError() {
            this(FAILED_TO_DELETE_CLIENT);
        }
    }
}
