package pl.servicetrack;

import io.vavr.control.Either;

public class TechnicianQuery {
    private static final String TECHNICIAN_TABLE = "technician_technician";
    private static final String ID_COLUMN = "id";
    private static final String USER_ID_COLUMN = "user_id";
    private static final String FIRST_NAME_COLUMN = "first_name";
    private static final String LAST_NAME_COLUMN = "last_name";
    private static final String EMAIL_COLUMN = "email";
    private static final String PHONE_NUMBER_COLUMN = "phone_number";

    public static final String SAVE_TECHNICIAN = "INSERT INTO %s VALUES (?, ?, ?, ?, ?, ?)"
            .formatted(TECHNICIAN_TABLE);

    public static final String UPDATE_TECHNICIAN = "UPDATE %s SET %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?"
            .formatted(TECHNICIAN_TABLE, FIRST_NAME_COLUMN,
                    LAST_NAME_COLUMN, EMAIL_COLUMN,
                    PHONE_NUMBER_COLUMN, ID_COLUMN);

    public static final String FETCH_TECHNICIANS = "SELECT * FROM %s"
            .formatted(TECHNICIAN_TABLE);

    public static final String FETCH_TECHNICIAN = "SELECT * FROM %s WHERE %s = ?"
            .formatted(TECHNICIAN_TABLE, ID_COLUMN);

    public static final String DELETE_TECHNICIAN = "DELETE FROM %s WHERE %s = ?"
            .formatted(TECHNICIAN_TABLE, ID_COLUMN);
}
