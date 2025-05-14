package pl.servicetrack.db.error;

import pl.servicetrack.BaseError;

public interface ServiceOrderError extends BaseError {

    String FAILED_TO_SAVE_TO_DATABASE = "Failed to save entity to the database";
    String FAILED_TO_UPDATE_SERVICEORDER = "Failed to update entity";
    String FAILED_TO_FETCH_SERVICEORDER = "Failed to fetch entity to the database";
    String UNSUCCESSFUL_DATABASE_READ = "The attempt to read from the database was unsuccessful";
    String FAILED_TO_DELETE_SERVICEORDER = "Failed to delete serviceOrder from the database";

    record FailedToSaveServiceOrderError(String message) implements ServiceOrderError{
        public FailedToSaveServiceOrderError() {
            this(FAILED_TO_SAVE_TO_DATABASE);
        }
    }

    record FailedToFetchTechnicianError(String message) implements ServiceOrderError {
        public FailedToFetchTechnicianError() {
            this(FAILED_TO_FETCH_SERVICEORDER);
        }
    }

    record DatabaseReadUnsuccessfulError(String message) implements ServiceOrderError {
        public DatabaseReadUnsuccessfulError() {
            this(UNSUCCESSFUL_DATABASE_READ);
        }
    }

    record FailedToDeleteServiceOrderError(String message) implements ServiceOrderError {
        public FailedToDeleteServiceOrderError() {
            this(FAILED_TO_DELETE_SERVICEORDER);
        }
    }
}
