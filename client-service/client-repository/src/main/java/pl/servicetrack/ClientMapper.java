package pl.servicetrack;

import org.springframework.jdbc.core.RowMapper;
import pl.servicetrack.db.model.ClientEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class ClientMapper implements RowMapper<ClientEntity> {

    @Override
    public ClientEntity mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new ClientEntity(
                UUID.fromString(rs.getString(Fields.ID)),
                rs.getString(Fields.NAME),
                rs.getString(Fields.EMAIL),
                rs.getString(Fields.PHONE_NUMBER)
        );
    }

    private static final class Fields {
        private static final String ID = "id";
        private static final String NAME = "name";
        private static final String EMAIL = "email";
        private static final String PHONE_NUMBER = "phone_number";
    }
}
