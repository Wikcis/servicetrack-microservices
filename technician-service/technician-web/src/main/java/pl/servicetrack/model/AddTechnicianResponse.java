package pl.servicetrack.model;

import java.util.UUID;

public record AddTechnicianResponse(UUID id,
                                    UUID userId,
                                    String firstName,
                                    String lastName,
                                    String email,
                                    String phoneNumber) {
}
