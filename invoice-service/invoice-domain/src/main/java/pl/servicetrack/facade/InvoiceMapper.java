package pl.servicetrack.facade;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.servicetrack.db.model.InvoiceEntity;
import pl.servicetrack.model.Invoice;

import java.util.List;

@Mapper
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);

    InvoiceEntity invoiceToInvoiceEntity(Invoice invoice);

    Invoice invoiceEntityToInvoice(InvoiceEntity invoiceEntity);

    List<Invoice> invoiceEntitiesToInvoices(List<InvoiceEntity> invoiceEntities);
}