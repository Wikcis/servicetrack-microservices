package pl.servicetrack.model;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record UpdateInvoiceRequest(

        @NotNull
        UUID serviceOrderId,

        @NotNull
        BigDecimal amount,

        @NotNull
        LocalDate issueDate){
}