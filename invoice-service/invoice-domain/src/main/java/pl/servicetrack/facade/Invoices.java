package pl.servicetrack.facade;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.InvoiceRepository;
import pl.servicetrack.model.Invoice;

import java.util.List;
import java.util.UUID;

public class Invoices {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper = InvoiceMapper.INSTANCE;

    public Invoices(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public Either<BaseError, Invoice> addInvoice(Invoice invoice) {
        return invoiceRepository.save(
                        invoiceMapper.invoiceToInvoiceEntity(invoice))
                .map(response -> invoice);
    }

    public Either<BaseError, Invoice> updateInvoice(Invoice invoice) {
        return invoiceRepository.update(
                        invoiceMapper.invoiceToInvoiceEntity(invoice))
                .map(response -> invoice);
    }

    public Either<BaseError, List<Invoice>> fetchInvoices() {
        return invoiceRepository.findAll()
                .map(invoiceMapper::invoiceEntitiesToInvoices);
    }

    public Either<BaseError, Invoice> fetchInvoice(UUID invoiceId) {
        return invoiceRepository.find(invoiceId)
                .map(invoiceMapper::invoiceEntityToInvoice);
    }

    public Either<BaseError, UUID> deleteInvoice(UUID invoiceId) {
        return invoiceRepository.delete(invoiceId);
    }
}