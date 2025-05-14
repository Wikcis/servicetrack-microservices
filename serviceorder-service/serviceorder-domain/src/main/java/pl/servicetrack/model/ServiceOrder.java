package pl.servicetrack.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record ServiceOrder(UUID id, UUID technicianId, UUID clientId, ServiceType serviceType,
                           ServiceFormat serviceFormat, String serviceDescription,
                           LocalDateTime dateTimeOfService, ServiceStatus status,
                           LocalTime serviceDuration, String comment, LocalDateTime creationDateTime) {
    public enum ServiceType {
        REPAIR, REPLACEMENT, ERROR_SOLUTION, OTHER
    }

    public enum ServiceFormat {
        ON_SITE, OFF_SITE, IN_HOUSE, CONSULTATION
    }

    public enum ServiceStatus {
        DONE, PLANNED, CANCELED, UNTIMELY
    }
}
