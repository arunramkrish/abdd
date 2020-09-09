package com.abdd.pharma.web.rest;

import com.abdd.pharma.domain.PrescriptionItem;
import com.abdd.pharma.repository.PrescriptionItemRepository;
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
 * REST controller for managing {@link com.abdd.pharma.domain.PrescriptionItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrescriptionItemResource {

    private final Logger log = LoggerFactory.getLogger(PrescriptionItemResource.class);

    private static final String ENTITY_NAME = "prescriptionItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrescriptionItemRepository prescriptionItemRepository;

    public PrescriptionItemResource(PrescriptionItemRepository prescriptionItemRepository) {
        this.prescriptionItemRepository = prescriptionItemRepository;
    }

    /**
     * {@code POST  /prescription-items} : Create a new prescriptionItem.
     *
     * @param prescriptionItem the prescriptionItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prescriptionItem, or with status {@code 400 (Bad Request)} if the prescriptionItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prescription-items")
    public ResponseEntity<PrescriptionItem> createPrescriptionItem(@RequestBody PrescriptionItem prescriptionItem) throws URISyntaxException {
        log.debug("REST request to save PrescriptionItem : {}", prescriptionItem);
        if (prescriptionItem.getId() != null) {
            throw new BadRequestAlertException("A new prescriptionItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrescriptionItem result = prescriptionItemRepository.save(prescriptionItem);
        return ResponseEntity.created(new URI("/api/prescription-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prescription-items} : Updates an existing prescriptionItem.
     *
     * @param prescriptionItem the prescriptionItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prescriptionItem,
     * or with status {@code 400 (Bad Request)} if the prescriptionItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prescriptionItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prescription-items")
    public ResponseEntity<PrescriptionItem> updatePrescriptionItem(@RequestBody PrescriptionItem prescriptionItem) throws URISyntaxException {
        log.debug("REST request to update PrescriptionItem : {}", prescriptionItem);
        if (prescriptionItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrescriptionItem result = prescriptionItemRepository.save(prescriptionItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prescriptionItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prescription-items} : get all the prescriptionItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prescriptionItems in body.
     */
    @GetMapping("/prescription-items")
    public List<PrescriptionItem> getAllPrescriptionItems() {
        log.debug("REST request to get all PrescriptionItems");
        return prescriptionItemRepository.findAll();
    }

    /**
     * {@code GET  /prescription-items/:id} : get the "id" prescriptionItem.
     *
     * @param id the id of the prescriptionItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prescriptionItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prescription-items/{id}")
    public ResponseEntity<PrescriptionItem> getPrescriptionItem(@PathVariable Long id) {
        log.debug("REST request to get PrescriptionItem : {}", id);
        Optional<PrescriptionItem> prescriptionItem = prescriptionItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prescriptionItem);
    }

    /**
     * {@code DELETE  /prescription-items/:id} : delete the "id" prescriptionItem.
     *
     * @param id the id of the prescriptionItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prescription-items/{id}")
    public ResponseEntity<Void> deletePrescriptionItem(@PathVariable Long id) {
        log.debug("REST request to delete PrescriptionItem : {}", id);
        prescriptionItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
