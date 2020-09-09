package com.abdd.pharma.web.rest;

import com.abdd.pharma.domain.DrugCompany;
import com.abdd.pharma.repository.DrugCompanyRepository;
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
 * REST controller for managing {@link com.abdd.pharma.domain.DrugCompany}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DrugCompanyResource {

    private final Logger log = LoggerFactory.getLogger(DrugCompanyResource.class);

    private static final String ENTITY_NAME = "drugCompany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DrugCompanyRepository drugCompanyRepository;

    public DrugCompanyResource(DrugCompanyRepository drugCompanyRepository) {
        this.drugCompanyRepository = drugCompanyRepository;
    }

    /**
     * {@code POST  /drug-companies} : Create a new drugCompany.
     *
     * @param drugCompany the drugCompany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new drugCompany, or with status {@code 400 (Bad Request)} if the drugCompany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/drug-companies")
    public ResponseEntity<DrugCompany> createDrugCompany(@RequestBody DrugCompany drugCompany) throws URISyntaxException {
        log.debug("REST request to save DrugCompany : {}", drugCompany);
        if (drugCompany.getId() != null) {
            throw new BadRequestAlertException("A new drugCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DrugCompany result = drugCompanyRepository.save(drugCompany);
        return ResponseEntity.created(new URI("/api/drug-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /drug-companies} : Updates an existing drugCompany.
     *
     * @param drugCompany the drugCompany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated drugCompany,
     * or with status {@code 400 (Bad Request)} if the drugCompany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the drugCompany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/drug-companies")
    public ResponseEntity<DrugCompany> updateDrugCompany(@RequestBody DrugCompany drugCompany) throws URISyntaxException {
        log.debug("REST request to update DrugCompany : {}", drugCompany);
        if (drugCompany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DrugCompany result = drugCompanyRepository.save(drugCompany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, drugCompany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /drug-companies} : get all the drugCompanies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of drugCompanies in body.
     */
    @GetMapping("/drug-companies")
    public List<DrugCompany> getAllDrugCompanies() {
        log.debug("REST request to get all DrugCompanies");
        return drugCompanyRepository.findAll();
    }

    /**
     * {@code GET  /drug-companies/:id} : get the "id" drugCompany.
     *
     * @param id the id of the drugCompany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the drugCompany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/drug-companies/{id}")
    public ResponseEntity<DrugCompany> getDrugCompany(@PathVariable Long id) {
        log.debug("REST request to get DrugCompany : {}", id);
        Optional<DrugCompany> drugCompany = drugCompanyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(drugCompany);
    }

    /**
     * {@code DELETE  /drug-companies/:id} : delete the "id" drugCompany.
     *
     * @param id the id of the drugCompany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/drug-companies/{id}")
    public ResponseEntity<Void> deleteDrugCompany(@PathVariable Long id) {
        log.debug("REST request to delete DrugCompany : {}", id);
        drugCompanyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
