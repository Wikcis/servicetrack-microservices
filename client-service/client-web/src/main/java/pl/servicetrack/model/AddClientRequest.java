package pl.servicetrack.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record AddClientRequest(

        @NotNull
        UUID id,

        @NotBlank
        @Size(max = 32)
        String name,

        @NotBlank
        @Size(max = 32)
        String email,

        @NotBlank
        @Size(max = 9)
        String phoneNumber){
}
