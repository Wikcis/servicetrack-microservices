package pl.servicetrack.db.error;

import pl.servicetrack.BaseError;

public interface InvoiceError extends BaseError {

    String FAILED_TO_SAVE_TO_DATABASE = "Failed to save entity to the database";
    String FAILED_TO_FETCH_INVOICE = "Failed to fetch entity from the database";
    String UNSUCCESSFUL_DATABASE_READ = "The attempt to read from the database was unsuccessful";
    String FAILED_TO_DELETE_INVOICE = "Failed to delete invoice from the database";

    record FailedToSaveInvoiceError(String message) implements InvoiceError {
        public FailedToSaveInvoiceError() {
            this(FAILED_TO_SAVE_TO_DATABASE);
        }
    }

    record FailedToFetchInvoiceError(String message) implements InvoiceError {
        public FailedToFetchInvoiceError() {
            this(FAILED_TO_FETCH_INVOICE);
        }
    }

    record DatabaseReadUnsuccessfulError(String message) implements InvoiceError {
        public DatabaseReadUnsuccessfulError() {
            this(UNSUCCESSFUL_DATABASE_READ);
        }
    }

    record FailedToDeleteInvoiceError(String message) implements InvoiceError {
        public FailedToDeleteInvoiceError() {
            this(FAILED_TO_DELETE_INVOICE);
        }
    }
}