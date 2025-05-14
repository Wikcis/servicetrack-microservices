package pl.servicetrack;

public class UserQuery {

    private static final String USER_TABLE = "user_user";
    private static final String ID_COLUMN = "id";
    private static final String FIRST_NAME_COLUMN = "first_name";
    private static final String LAST_NAME_COLUMN = "last_name";
    private static final String PASSWORD_COLUMN = "password";
    private static final String EMAIL_COLUMN = "email";
    private static final String PHONE_NUMBER_COLUMN = "phone_number";
    private static final String ROLE_COLUMN = "role";
    private static final String CREATED_AT_COLUMN = "created_at";

    public static final String SAVE_USER = "INSERT INTO %s VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            .formatted(USER_TABLE);

    public static final String UPDATE_USER = "UPDATE %s SET %s = ?, %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?"
            .formatted(USER_TABLE, FIRST_NAME_COLUMN, LAST_NAME_COLUMN,
                    PASSWORD_COLUMN, EMAIL_COLUMN,
                    PHONE_NUMBER_COLUMN, ID_COLUMN);

    public static final String FETCH_USER_BY_USER_ID = "SELECT * FROM %s WHERE %s = ?"
            .formatted(USER_TABLE, ID_COLUMN);
    public static final String FETCH_USER_BY_EMAIL = "SELECT * FROM %s WHERE %s = ?"
            .formatted(USER_TABLE, EMAIL_COLUMN);
}
