package pl.servicetrack.model;

import java.util.UUID;

public record Client(UUID id,
                     String name,
                     String email,
                     String phoneNumber) {
}
