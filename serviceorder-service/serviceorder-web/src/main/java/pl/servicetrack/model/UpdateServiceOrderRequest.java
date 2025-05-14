package pl.servicetrack.model;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record UpdateServiceOrderRequest(

        @NotNull
        UUID technicianId,

        @NotNull
        UUID clientId,

        @NotNull
        CreateServiceOrderRequest.ServiceType serviceType,

        @NotNull
        CreateServiceOrderRequest.ServiceFormat serviceFormat,

        @Size(max = 512)
        String serviceDescription,

        @NotNull
        LocalDateTime dateTimeOfService,

        @NotNull
        CreateServiceOrderRequest.ServiceStatus status,

        LocalTime serviceDuration,

        @Size(max = 512)
        String comment) {
}
