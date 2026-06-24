package pl.servicetrack;

import org.springframework.jdbc.core.RowMapper;
import pl.servicetrack.db.model.InvoiceEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;
import java.time.LocalDate;

public class InvoiceMapper implements RowMapper<InvoiceEntity> {

    @Override
    public InvoiceEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new InvoiceEntity(
                UUID.fromString(rs.getString(Fields.ID)),
                UUID.fromString(rs.getString(Fields.SERVICE_ORDER_ID)),
                rs.getBigDecimal(Fields.AMOUNT),
                rs.getObject(Fields.ISSUE_DATE, LocalDate.class)
        );
    }

    private static final class Fields {
        private static final String ID = "id";
        private static final String SERVICE_ORDER_ID = "service_order_id";
        private static final String AMOUNT = "amount";
        private static final String ISSUE_DATE = "issue_date";
    }
}