package pl.servicetrack.facade;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.ServiceOrderRepository;
import pl.servicetrack.error.ServiceOrderDomainError;
import pl.servicetrack.model.ServiceOrder;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class ServiceOrders {

    private final ServiceOrderRepository serviceOrderRepository;
    private final ServiceOrderMapper serviceOrderMapper = ServiceOrderMapper.INSTANCE;

    public ServiceOrders(ServiceOrderRepository serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }
    public Either<BaseError, ServiceOrder> createServiceOrder(ServiceOrder serviceOrder) {
        return serviceOrderRepository.save(serviceOrderMapper.serviceOrderToServiceOrderEntity(serviceOrder))
                .map(response -> serviceOrder);
    }

    public Either<BaseError, ServiceOrder> updateServiceOrder(ServiceOrder serviceOrder) {
        return serviceOrderRepository.update(serviceOrderMapper.serviceOrderToServiceOrderEntity(serviceOrder))
                .map(response -> serviceOrder);
    }

    public Either<BaseError, List<ServiceOrder>> fetchServiceOrders() {
        return serviceOrderRepository.findAll()
                .map(serviceOrderMapper::serviceOrderEntitiesToServiceOrders);
    }
    public Either<BaseError, ServiceOrder> fetchServiceOrder(UUID serviceOrderId) {
        return serviceOrderRepository.find(serviceOrderId)
                .filterOrElse(Objects::nonNull, error -> new ServiceOrderDomainError.ServiceOrderNotFound())
                .map(serviceOrderMapper::serviceOrderEntityToServiceOrder);
    }

    public Either<BaseError, UUID> deleteServiceOrder(UUID serviceOrderId) {
        return serviceOrderRepository.delete(serviceOrderId);
    }
}
