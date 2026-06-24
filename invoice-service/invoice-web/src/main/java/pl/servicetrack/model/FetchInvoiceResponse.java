package pl.servicetrack.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record FetchInvoiceResponse(UUID id,
                                   UUID serviceOrderId,
                                   BigDecimal amount,
                                   LocalDate issueDate) {
}