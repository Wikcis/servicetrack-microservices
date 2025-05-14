package pl.servicetrack.model;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper
public interface TechnicianControllerMapper {

    TechnicianControllerMapper INSTANCE = Mappers.getMapper(TechnicianControllerMapper.class);
    Technician addRequestBodyToTechnician(AddTechnicianRequest addTechnicianRequest);
    Technician updateRequestBodyToTechnician(UpdateTechnicianRequest updateTechnicianRequest, UUID id);
    AddTechnicianResponse technicianToAddTechnicianResponse(Technician technician);
    FetchTechnicianResponse technicianToFetchTechnicianResponse(Technician technician);
    FetchTechniciansResponse.Technician mapToFetchTechnicians(Technician technician);
    default FetchTechniciansResponse techniciansToFetchTechniciansResponse(List<Technician> technicians) {
        return new FetchTechniciansResponse(
                technicians.stream().map(this::mapToFetchTechnicians)
                        .collect(Collectors.toList()));
    }
}
