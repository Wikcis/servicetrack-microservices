package pl.servicetrack.facade;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.servicetrack.db.model.TechnicianEntity;
import pl.servicetrack.model.Technician;

import java.util.List;

@Mapper
public interface TechnicianMapper {

    TechnicianMapper INSTANCE = Mappers.getMapper(TechnicianMapper.class);

    TechnicianEntity technicianToTechnicianEntity(Technician technician);

    Technician technicianEntityToTechnician(TechnicianEntity technicianEntity);

    List<Technician> technicianEntitiesToTechnicians(List<TechnicianEntity> technicianEntities);
}
