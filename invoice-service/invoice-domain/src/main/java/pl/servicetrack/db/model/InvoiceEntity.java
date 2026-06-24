package pl.servicetrack.db.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record InvoiceEntity(UUID id,
                            UUID serviceOrderId,
                            BigDecimal amount,
                            LocalDate issueDate) {
}