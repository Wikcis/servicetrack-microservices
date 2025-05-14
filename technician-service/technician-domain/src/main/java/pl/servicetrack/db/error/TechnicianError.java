package pl.servicetrack.db.error;

import pl.servicetrack.BaseError;

public interface TechnicianError extends BaseError {

    String FAILED_TO_SAVE_TO_DATABASE = "Failed to save entity to the database";
    String FAILED_TO_FETCH_TECHNICIAN = "Failed to fetch entity from the database";
    String UNSUCCESSFUL_DATABASE_READ = "The attempt to read from the database was unsuccessful";
    String FAILED_TO_DELETE_TECHNICIAN = "Failed to delete technician from the database";


    record FailedtoSaveTechnicianError(String message) implements TechnicianError {
        public FailedtoSaveTechnicianError() {
            this(FAILED_TO_SAVE_TO_DATABASE);
        }
    }

    record FailedtoFetchTechnicianError(String message) implements TechnicianError {
        public FailedtoFetchTechnicianError() {
            this(FAILED_TO_FETCH_TECHNICIAN);
        }
    }

    record DatabaseReadUnsuccessfulError(String message) implements TechnicianError {
        public DatabaseReadUnsuccessfulError() {
            this(UNSUCCESSFUL_DATABASE_READ);
        }
    }

    record FailedToDeleteTechnicianError(String message) implements TechnicianError {
        public FailedToDeleteTechnicianError() {
            this(FAILED_TO_DELETE_TECHNICIAN);
        }
    }
}
