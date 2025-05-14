package pl.servicetrack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.servicetrack.db.error.ServiceOrderError;

public record ServiceOrderResponseResolver() {

    static String UNKNOWN_ERROR = "An unknown error has occurred";
    static String SERVICEORDER_NOT_FOUND = "Service Order has not been found in the database";

    public static ResponseEntity<?> resolveError(BaseError error) {
        if (error instanceof ServiceOrderError.FailedToSaveServiceOrderError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof ServiceOrderError.FailedToFetchTechnicianError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof ServiceOrderError.DatabaseReadUnsuccessfulError) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(SERVICEORDER_NOT_FOUND);
        } else if (error instanceof ServiceOrderError.FailedToDeleteServiceOrderError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
    }
}
