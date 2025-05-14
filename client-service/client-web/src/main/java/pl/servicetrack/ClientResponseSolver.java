package pl.servicetrack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.servicetrack.db.error.ClientError;

public class ClientResponseSolver {

    static String UNKNOWN_ERROR = "An unknown error has occurred";
    static String CLIENT_NOT_FOUND = "Client has not been found in the database";

    public static ResponseEntity<?> resolveError(BaseError error) {
        if (error instanceof ClientError.FailedToSaveClientError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof ClientError.FailedToFetchTechnicianError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof ClientError.DatabaseReadUnsuccessfulError) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CLIENT_NOT_FOUND);
        } else if (error instanceof ClientError.FailedToDeleteClientError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
    }
}
