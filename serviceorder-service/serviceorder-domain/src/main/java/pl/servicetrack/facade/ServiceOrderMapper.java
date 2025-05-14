package pl.servicetrack.facade;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.servicetrack.db.model.ServiceOrderEntity;
import pl.servicetrack.model.ServiceOrder;

import java.util.List;

@Mapper
public interface ServiceOrderMapper {

    ServiceOrderMapper INSTANCE = Mappers.getMapper(ServiceOrderMapper.class);

    ServiceOrderEntity serviceOrderToServiceOrderEntity(ServiceOrder serviceOrder);

    ServiceOrder serviceOrderEntityToServiceOrder(ServiceOrderEntity serviceOrderEntity);

    List<ServiceOrder> serviceOrderEntitiesToServiceOrders(List<ServiceOrderEntity> serviceOrderEntities);
}
