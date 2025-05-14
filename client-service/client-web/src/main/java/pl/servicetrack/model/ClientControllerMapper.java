package pl.servicetrack.model;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper
public interface ClientControllerMapper {
    ClientControllerMapper INSTANCE = Mappers.getMapper(ClientControllerMapper.class);
    Client addRequestBodyToClient(AddClientRequest addClientRequest);
    Client updateRequestBodyToClient(UpdateClientRequest updateClientRequest, UUID id);
    AddClientResponse clientToAddClientResponse(Client client);
    FetchClientResponse clientToFetchClientResponse(Client client);
    FetchClientsResponse.Client mapToFetchClientsResponse(Client client);

    default FetchClientsResponse clientsToFetchClientsResponse(List<Client> clients) {
        return new FetchClientsResponse(
                clients.stream().map(this::mapToFetchClientsResponse)
                        .collect(Collectors.toList()));
    }
}
