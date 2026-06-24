package pl.servicetrack.error;

import pl.servicetrack.BaseError;

public interface InvoiceDomainError extends BaseError {

    String INVOICE_NOT_FOUND = "Invoice not found in the database";

    record InvoiceNotFound(String message) implements InvoiceDomainError {
        public InvoiceNotFound() {
            this(INVOICE_NOT_FOUND);
        }
    }
}