package pl.servicetrack.model;

import java.util.List;
import java.util.UUID;

public record FetchTechniciansResponse(List<Technician> technicians) {
    public record Technician(UUID id,
                             UUID userId,
                             String firstName,
                             String lastName,
                             String email,
                             String phoneNumber) {

    }
}
