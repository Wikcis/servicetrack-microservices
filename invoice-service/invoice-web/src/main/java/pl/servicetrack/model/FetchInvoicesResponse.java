package pl.servicetrack.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FetchInvoicesResponse(List<Invoice> invoices) {
    public record Invoice(UUID id,
                          UUID serviceOrderId,
                          BigDecimal amount,
                          LocalDate issueDate) {
    }
}