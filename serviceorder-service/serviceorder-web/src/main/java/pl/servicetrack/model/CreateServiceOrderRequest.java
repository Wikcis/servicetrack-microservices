package pl.servicetrack.model;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record CreateServiceOrderRequest(
        @NotNull
        UUID id,

        @NotNull
        UUID technicianId,

        @NotNull
        UUID clientId,

        @NotNull
        ServiceType serviceType,

        @NotNull
        ServiceFormat serviceFormat,

        @Size(max = 512)
        String serviceDescription,

        @NotNull
        LocalDateTime dateTimeOfService,

        @NotNull
        ServiceStatus status,

        LocalTime serviceDuration,

        @Size(max = 512)
        String comment) {
    public enum ServiceType {
        REPAIR,
        REPLACEMENT,
        ERROR_SOLUTION,
        OTHER
    }
    public enum ServiceFormat {
        ON_SITE,
        OFF_SITE,
        IN_HOUSE,
        CONSULTATION
    }

    public enum ServiceStatus {
        DONE,
        PLANNED,
        CANCELED,
        UNTIMELY
    }
}
