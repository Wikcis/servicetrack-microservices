package pl.servicetrack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.servicetrack.db.error.InvoiceError;

public class InvoiceResponseSolver {

    static String UNKNOWN_ERROR = "An unknown error has occurred";
    static String INVOICE_NOT_FOUND = "Invoice has not been found in the database";

    public static ResponseEntity<?> resolveError(BaseError error) {
        if (error instanceof InvoiceError.FailedToSaveInvoiceError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof InvoiceError.FailedToFetchInvoiceError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof InvoiceError.DatabaseReadUnsuccessfulError) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(INVOICE_NOT_FOUND);
        } else if (error instanceof InvoiceError.FailedToDeleteInvoiceError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
    }
}