package com.abdd.pharma.web.rest;

import com.abdd.pharma.domain.PrescriptionStatus;
import com.abdd.pharma.repository.PrescriptionStatusRepository;
import com.abdd.pharma.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.abdd.pharma.domain.PrescriptionStatus}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrescriptionStatusResource {

    private final Logger log = LoggerFactory.getLogger(PrescriptionStatusResource.class);

    private static final String ENTITY_NAME = "prescriptionStatus";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrescriptionStatusRepository prescriptionStatusRepository;

    public PrescriptionStatusResource(PrescriptionStatusRepository prescriptionStatusRepository) {
        this.prescriptionStatusRepository = prescriptionStatusRepository;
    }

    /**
     * {@code POST  /prescription-statuses} : Create a new prescriptionStatus.
     *
     * @param prescriptionStatus the prescriptionStatus to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prescriptionStatus, or with status {@code 400 (Bad Request)} if the prescriptionStatus has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prescription-statuses")
    public ResponseEntity<PrescriptionStatus> createPrescriptionStatus(@RequestBody PrescriptionStatus prescriptionStatus) throws URISyntaxException {
        log.debug("REST request to save PrescriptionStatus : {}", prescriptionStatus);
        if (prescriptionStatus.getId() != null) {
            throw new BadRequestAlertException("A new prescriptionStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrescriptionStatus result = prescriptionStatusRepository.save(prescriptionStatus);
        return ResponseEntity.created(new URI("/api/prescription-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prescription-statuses} : Updates an existing prescriptionStatus.
     *
     * @param prescriptionStatus the prescriptionStatus to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prescriptionStatus,
     * or with status {@code 400 (Bad Request)} if the prescriptionStatus is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prescriptionStatus couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prescription-statuses")
    public ResponseEntity<PrescriptionStatus> updatePrescriptionStatus(@RequestBody PrescriptionStatus prescriptionStatus) throws URISyntaxException {
        log.debug("REST request to update PrescriptionStatus : {}", prescriptionStatus);
        if (prescriptionStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrescriptionStatus result = prescriptionStatusRepository.save(prescriptionStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prescriptionStatus.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prescription-statuses} : get all the prescriptionStatuses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prescriptionStatuses in body.
     */
    @GetMapping("/prescription-statuses")
    public List<PrescriptionStatus> getAllPrescriptionStatuses() {
        log.debug("REST request to get all PrescriptionStatuses");
        return prescriptionStatusRepository.findAll();
    }

    /**
     * {@code GET  /prescription-statuses/:id} : get the "id" prescriptionStatus.
     *
     * @param id the id of the prescriptionStatus to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prescriptionStatus, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prescription-statuses/{id}")
    public ResponseEntity<PrescriptionStatus> getPrescriptionStatus(@PathVariable Long id) {
        log.debug("REST request to get PrescriptionStatus : {}", id);
        Optional<PrescriptionStatus> prescriptionStatus = prescriptionStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prescriptionStatus);
    }

    /**
     * {@code DELETE  /prescription-statuses/:id} : delete the "id" prescriptionStatus.
     *
     * @param id the id of the prescriptionStatus to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prescription-statuses/{id}")
    public ResponseEntity<Void> deletePrescriptionStatus(@PathVariable Long id) {
        log.debug("REST request to delete PrescriptionStatus : {}", id);
        prescriptionStatusRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
