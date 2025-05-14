package pl.servicetrack;

import org.springframework.jdbc.core.RowMapper;
import pl.servicetrack.db.model.TechnicianEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class TechnicianMapper implements RowMapper<TechnicianEntity> {

    @Override
    public TechnicianEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new TechnicianEntity(
                UUID.fromString(rs.getString(Fields.ID)),
                rs.getString(Fields.USER_ID) != null ? UUID.fromString(rs.getString(Fields.USER_ID)) : null,
                rs.getString(Fields.FIRST_NAME),
                rs.getString(Fields.LAST_NAME),
                rs.getString(Fields.EMAIL),
                rs.getString(Fields.PHONE_NUMBER)
        );

    }

    private static final class Fields {
        private static final String ID = "id";
        private static final String USER_ID = "user_id";
        private static final String FIRST_NAME = "first_name";
        private static final String LAST_NAME = "last_name";
        private static final String EMAIL = "email";
        private static final String PHONE_NUMBER = "phone_number";

    }
}
