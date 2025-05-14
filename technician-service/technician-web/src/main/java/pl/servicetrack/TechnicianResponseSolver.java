package pl.servicetrack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.servicetrack.db.error.TechnicianError;

public record TechnicianResponseSolver() {

    static String UNKNOWN_ERROR = "An unknown error has occurred";
    static String TECHNICIAN_NOT_FOUND = "Technician has not been found in the database";

    public static ResponseEntity<?> resolveError(BaseError error) {
        if (error instanceof TechnicianError.FailedtoSaveTechnicianError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof TechnicianError.FailedtoFetchTechnicianError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        } else if (error instanceof TechnicianError.DatabaseReadUnsuccessfulError) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(TECHNICIAN_NOT_FOUND);
        } else if (error instanceof TechnicianError.FailedToDeleteTechnicianError) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(UNKNOWN_ERROR);
    }
}
