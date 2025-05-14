package pl.servicetrack;

import org.springframework.jdbc.core.RowMapper;
import pl.servicetrack.db.model.ServiceOrderEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class ServiceOrderMapper implements RowMapper<ServiceOrderEntity> {
    @Override
    public ServiceOrderEntity mapRow(ResultSet rs, int numRow) throws SQLException {
        LocalTime serviceDuration = null;
        if (rs.getTime(Fields.SERVICE_DURATION) != null) {
            serviceDuration = rs.getTime(Fields.SERVICE_DURATION).toLocalTime();
        }

        return new ServiceOrderEntity(
                UUID.fromString(rs.getString(Fields.ID)),
                UUID.fromString(rs.getString(Fields.TECHNICIAN_ID)),
                UUID.fromString(rs.getString(Fields.CLIENT_ID)),
                ServiceOrderEntity.ServiceType.valueOf(rs.getString(Fields.SERVICE_TYPE)),
                ServiceOrderEntity.ServiceFormat.valueOf(rs.getString(Fields.SERVICE_FORMAT)),
                rs.getString(Fields.SERVICE_DESCRIPTION),
                rs.getTimestamp(Fields.DATETIME_OF_SERVICE).toLocalDateTime(),
                ServiceOrderEntity.ServiceStatus.valueOf(rs.getString(Fields.STATUS)),
                serviceDuration,
                rs.getString(Fields.COMMENT),
                rs.getTimestamp(Fields.CREATION_DATETIME).toLocalDateTime()
        );
    }
    private static final class Fields{
        private static final String ID = "id";
        private static final String TECHNICIAN_ID = "technician_id";
        private static final String CLIENT_ID = "client_id";
        private static final String SERVICE_TYPE = "service_type";
        private static final String SERVICE_FORMAT = "service_format";
        private static final String SERVICE_DESCRIPTION = "service_description";
        private static final String DATETIME_OF_SERVICE = "datetime_of_service";
        private static final String STATUS = "status";
        private static final String SERVICE_DURATION = "service_duration";
        private static final String COMMENT = "comment";
        private static final String CREATION_DATETIME = "creation_datetime";

    }
}
