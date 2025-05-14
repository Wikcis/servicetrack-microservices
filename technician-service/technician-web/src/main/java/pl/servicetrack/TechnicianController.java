package pl.servicetrack;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.servicetrack.model.AddTechnicianRequest;
import pl.servicetrack.model.TechnicianControllerMapper;
import pl.servicetrack.facade.Technicians;
import pl.servicetrack.model.UpdateTechnicianRequest;

import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
public class TechnicianController {

    private final TechnicianControllerMapper technicianControllerMapper = TechnicianControllerMapper.INSTANCE;
    private final Technicians technicians;

    public TechnicianController(Technicians technicians) {
        this.technicians = technicians;
    }

    @GetMapping("/technicians")
    ResponseEntity<?> fetchTechnicians() {
        return technicians.fetchTechnicians()
                .fold(
                        TechnicianResponseSolver::resolveError,
                        response -> ResponseEntity.status(OK).body(
                                technicianControllerMapper.techniciansToFetchTechniciansResponse(response)
                        )
                );
    }

    @PostMapping("/technicians")
    ResponseEntity<?> addTechnician(@Valid @RequestBody AddTechnicianRequest addTechnicianRequest) {
        return technicians.addTechnician(
                        technicianControllerMapper.addRequestBodyToTechnician(addTechnicianRequest))
                .fold(
                        TechnicianResponseSolver::resolveError,
                        response -> ResponseEntity.status(CREATED).body(
                                technicianControllerMapper.technicianToAddTechnicianResponse(response))
                );
    }

    @PutMapping("/technicians/{technicianId}")
    ResponseEntity<?> updateTechnician(@Valid @RequestBody UpdateTechnicianRequest updateTechnicianRequest,
                                         @PathVariable("technicianId") UUID technicianId) {
        return technicians.updateTechnician(
                        technicianControllerMapper.updateRequestBodyToTechnician(
                                updateTechnicianRequest,
                                technicianId))
                .fold(
                        TechnicianResponseSolver::resolveError,
                        success -> ResponseEntity.status(OK).build()
                );
    }

    @GetMapping("/technicians/{technicianId}")
    ResponseEntity<?> fetchTechnician(@PathVariable("technicianId") UUID technicianId) {
        return technicians.fetchTechnician(technicianId)
                .fold(
                        TechnicianResponseSolver::resolveError,
                        response -> ResponseEntity.status(OK).body(
                                technicianControllerMapper.technicianToFetchTechnicianResponse(response)
                        )
                );
    }

    @DeleteMapping("/technicians/{technicianId}")
    ResponseEntity<?> deleteTechnician(@PathVariable("technicianId") UUID technicianId) {
        return technicians.deleteTechnician(technicianId)
                .fold(
                        TechnicianResponseSolver::resolveError,
                        response -> ResponseEntity.status(OK).build()
                );
    }
}
