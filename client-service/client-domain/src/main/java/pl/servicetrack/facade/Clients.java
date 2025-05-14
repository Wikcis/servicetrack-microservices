package pl.servicetrack.facade;

import io.vavr.control.Either;
import pl.servicetrack.BaseError;
import pl.servicetrack.db.ClientRepository;
import pl.servicetrack.model.Client;

import java.util.List;
import java.util.UUID;

public class Clients {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper = ClientMapper.INSTANCE;

    public Clients(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Either<BaseError, Client> addClient(Client client) {
        return clientRepository.save(
                        clientMapper.clientToClientEntity(client))
                .map(response -> client);
    }

    public Either<BaseError, Client> updateClient(Client client) {
        return clientRepository.update(
                        clientMapper.clientToClientEntity(client))
                .map(response -> client);
    }

    public Either<BaseError, List<Client>> fetchClients() {
        return clientRepository.findAll()
                .map(clientMapper::clientEntitiesToClients);
    }

    public Either<BaseError, Client> fetchClient(UUID clientId) {
        return clientRepository.find(clientId)
                .map(clientMapper::clientEntityToClient);
    }

    public Either<BaseError, UUID> deleteClient(UUID clientId) {
        return clientRepository.delete(clientId);
    }
}
