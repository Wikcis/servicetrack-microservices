package pl.servicetrack;

public class InvoiceQuery {

    private static final String INVOICES_TABLE = "invoice_invoice";
    private static final String ID_COLUMN = "id";
    private static final String SERVICE_ORDER_ID_COLUMN = "service_order_id";
    private static final String AMOUNT_COLUMN = "amount";
    private static final String ISSUE_DATE_COLUMN = "issue_date";

    public static final String SAVE_INVOICE = "INSERT INTO %s VALUES (?, ?, ?, ?)"
            .formatted(INVOICES_TABLE);
    public static final String UPDATE_INVOICE = "UPDATE %s SET %s = ?, %s = ?, %s = ? WHERE %s = ?"
            .formatted(INVOICES_TABLE, SERVICE_ORDER_ID_COLUMN, AMOUNT_COLUMN,
                    ISSUE_DATE_COLUMN, ID_COLUMN);
    public static final String FETCH_INVOICES = "SELECT * FROM %s"
            .formatted(INVOICES_TABLE);
    public static final String FETCH_INVOICE = "SELECT * FROM %s WHERE %s = ?"
            .formatted(INVOICES_TABLE, ID_COLUMN);

    public static final String DELETE_INVOICE = "DELETE FROM %s WHERE %s = ?"
            .formatted(INVOICES_TABLE, ID_COLUMN);
}