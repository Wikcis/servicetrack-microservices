package pl.servicetrack;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.servicetrack.model.InvoiceControllerMapper;
import pl.servicetrack.model.AddInvoiceRequest;
import pl.servicetrack.facade.Invoices;
import pl.servicetrack.model.UpdateInvoiceRequest;

import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
public class InvoiceController {
    private final Invoices invoices;
    private final InvoiceControllerMapper invoiceControllerMapper = InvoiceControllerMapper.INSTANCE;

    public InvoiceController(Invoices invoices) {
        this.invoices = invoices;
    }

    @GetMapping("/invoices")
    ResponseEntity<?> fetchInvoices() {
        return invoices.fetchInvoices().fold(InvoiceResponseSolver::resolveError, response -> ResponseEntity.status(OK).body(
                invoiceControllerMapper.invoicesToFetchInvoicesResponse(response)));
    }

    @PostMapping("/invoices")
    ResponseEntity<?> addInvoice(@Valid @RequestBody AddInvoiceRequest addInvoiceRequest) {
        return invoices.addInvoice(invoiceControllerMapper.addRequestBodyToInvoice(addInvoiceRequest))
                .fold(InvoiceResponseSolver::resolveError, response -> ResponseEntity.status(CREATED).body(
                        invoiceControllerMapper.invoiceToAddInvoiceResponse(response)));
    }


    @PutMapping("/invoices/{invoiceId}")
    ResponseEntity<?> updateInvoice(@Valid @RequestBody UpdateInvoiceRequest updateInvoiceRequest,
                                    @PathVariable("invoiceId") UUID invoiceId) {
        return invoices.updateInvoice(invoiceControllerMapper.updateRequestBodyToInvoice(updateInvoiceRequest, invoiceId))
                .fold(InvoiceResponseSolver::resolveError, success -> ResponseEntity.status(OK).build());
    }
    @GetMapping("/invoices/{invoiceId}")
    ResponseEntity<?> fetchInvoice(@PathVariable("invoiceId") UUID invoiceId) {
        return invoices.fetchInvoice(invoiceId).fold(
                InvoiceResponseSolver::resolveError, response -> ResponseEntity.status(OK).body(
                        invoiceControllerMapper.invoiceToFetchInvoiceResponse(response)));
    }

    @DeleteMapping("/invoices/{invoiceId}")
    ResponseEntity<?> deleteInvoice(@PathVariable("invoiceId") UUID invoiceId) {
        return invoices.deleteInvoice(invoiceId)
                .fold(
                        InvoiceResponseSolver::resolveError,
                        success -> ResponseEntity.status(OK).build()
                );
    }
}