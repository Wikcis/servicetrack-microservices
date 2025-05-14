package pl.servicetrack.model;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper
public interface ServiceOrderControllerMapper {
    ServiceOrderControllerMapper INSTANCE = Mappers.getMapper(ServiceOrderControllerMapper.class);

    FetchServiceOrdersResponse.ServiceOrder mapToFetchServiceOrdersResponse(ServiceOrder serviceOrder);

    FetchServiceOrderResponse serviceOrderToFetchServiceOrderResponse(ServiceOrder serviceOrder);

    ServiceOrder createRequestBodyToServiceOrder(
            CreateServiceOrderRequest createServiceOrderRequest,
            LocalDateTime creationDateTime);

    ServiceOrder updateRequestBodyToServiceOrder(UpdateServiceOrderRequest updateServiceOrderRequest, UUID id);

    CreateServiceOrderResponse serviceOrderToCreateServiceOrderResponse(ServiceOrder serviceOrder);

    default FetchServiceOrdersResponse serviceOrdersToFetchServiceOrdersResponse(List<ServiceOrder> serviceOrders) {
        return new FetchServiceOrdersResponse(serviceOrders.stream()
                .map(this::mapToFetchServiceOrdersResponse)
                .collect(Collectors.toList()));
    }
}
