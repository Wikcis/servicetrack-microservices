package pl.servicetrack.model;

import java.util.UUID;

public record AddClientResponse(UUID id,
                                String name,
                                String email,
                                String phoneNumber) {
}
