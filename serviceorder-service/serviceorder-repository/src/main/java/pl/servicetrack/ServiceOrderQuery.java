package pl.servicetrack;

public class ServiceOrderQuery {
    private static final String SERVICEORDER_TABLE = "serviceorder_serviceorder";
    private static final String ID_COLUMN = "id";
    private static final String TECHNICIAN_ID_COLUMN = "technician_id";
    private static final String CLIENT_ID_COLUMN = "client_id";
    private static final String SERVICE_TYPE_COLUMN = "service_type";
    private static final String SERVICE_FORMAT_COLUMN = "service_format";
    private static final String SERVICE_DESCRIPTION_COLUMN = "service_description";
    private static final String DATETIME_OF_SERVICE_COLUMN = "datetime_of_service";
    private static final String STATUS_COLUMN = "status";
    private static final String SERVICE_DURATION_COLUMN = "service_duration";
    private static final String COMMENT_COLUMN = "comment";
    private static final String CREATION_DATETIME_COLUMN = "creation_datetime";

    public static final String SAVE_SERVICEORDER = "INSERT INTO %s VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            .formatted(SERVICEORDER_TABLE);
  
    public static final String UPDATE_SERVICEORDER =
            "UPDATE %s SET %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?"
            .formatted(SERVICEORDER_TABLE, TECHNICIAN_ID_COLUMN, CLIENT_ID_COLUMN, SERVICE_TYPE_COLUMN,
                    SERVICE_FORMAT_COLUMN, SERVICE_DESCRIPTION_COLUMN, DATETIME_OF_SERVICE_COLUMN, STATUS_COLUMN,
                    SERVICE_DURATION_COLUMN, COMMENT_COLUMN, ID_COLUMN);

    public static final String FETCH_SERVICEORDERS = "SELECT * FROM %s"
            .formatted(SERVICEORDER_TABLE);

    public static final String FETCH_SERVICEORDER = "SELECT * FROM %s WHERE %s = ?"
            .formatted(SERVICEORDER_TABLE, ID_COLUMN);

    public static final String DELETE_SERVICEORDER = "DELETE FROM %s WHERE %s = ?"
            .formatted(SERVICEORDER_TABLE, ID_COLUMN);
}
