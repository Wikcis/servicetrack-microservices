package pl.servicetrack.model;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper
public interface InvoiceControllerMapper {
    InvoiceControllerMapper INSTANCE = Mappers.getMapper(InvoiceControllerMapper.class);
    Invoice addRequestBodyToInvoice(AddInvoiceRequest addInvoiceRequest);
    Invoice updateRequestBodyToInvoice(UpdateInvoiceRequest updateInvoiceRequest, UUID id);
    AddInvoiceResponse invoiceToAddInvoiceResponse(Invoice invoice);
    FetchInvoiceResponse invoiceToFetchInvoiceResponse(Invoice invoice);
    FetchInvoicesResponse.Invoice mapToFetchInvoicesResponse(Invoice invoice);

    default FetchInvoicesResponse invoicesToFetchInvoicesResponse(List<Invoice> invoices) {
        return new FetchInvoicesResponse(
                invoices.stream().map(this::mapToFetchInvoicesResponse)
                        .collect(Collectors.toList()));
    }
}