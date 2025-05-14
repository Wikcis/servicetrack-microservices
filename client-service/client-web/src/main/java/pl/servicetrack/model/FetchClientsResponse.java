package pl.servicetrack.model;

import java.util.List;
import java.util.UUID;

public record FetchClientsResponse(List<Client> clients) {
    public record Client(UUID id,
                         String name,
                         String email,
                         String phoneNumber) {
    }
}
