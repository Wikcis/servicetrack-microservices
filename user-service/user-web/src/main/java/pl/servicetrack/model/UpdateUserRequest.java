package pl.servicetrack.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

        @NotBlank
        @Size(max = 32)
        String firstName,

        @NotBlank
        @Size(max = 64)
        String lastName,

        @NotBlank
        @Size(max = 64)
        String password,

        @NotBlank
        @Email
        @Size(max = 32)
        String email,

        @NotBlank
        @Size(max = 9)
        String phoneNumber) {
}
