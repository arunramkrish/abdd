package com.abdd.pharma.web.rest;

import com.abdd.pharma.AbddApp;
import com.abdd.pharma.domain.PrescriptionStatus;
import com.abdd.pharma.repository.PrescriptionStatusRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrescriptionStatusResource} REST controller.
 */
@SpringBootTest(classes = AbddApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PrescriptionStatusResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PrescriptionStatusRepository prescriptionStatusRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrescriptionStatusMockMvc;

    private PrescriptionStatus prescriptionStatus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrescriptionStatus createEntity(EntityManager em) {
        PrescriptionStatus prescriptionStatus = new PrescriptionStatus()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return prescriptionStatus;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrescriptionStatus createUpdatedEntity(EntityManager em) {
        PrescriptionStatus prescriptionStatus = new PrescriptionStatus()
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return prescriptionStatus;
    }

    @BeforeEach
    public void initTest() {
        prescriptionStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrescriptionStatus() throws Exception {
        int databaseSizeBeforeCreate = prescriptionStatusRepository.findAll().size();
        // Create the PrescriptionStatus
        restPrescriptionStatusMockMvc.perform(post("/api/prescription-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionStatus)))
            .andExpect(status().isCreated());

        // Validate the PrescriptionStatus in the database
        List<PrescriptionStatus> prescriptionStatusList = prescriptionStatusRepository.findAll();
        assertThat(prescriptionStatusList).hasSize(databaseSizeBeforeCreate + 1);
        PrescriptionStatus testPrescriptionStatus = prescriptionStatusList.get(prescriptionStatusList.size() - 1);
        assertThat(testPrescriptionStatus.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testPrescriptionStatus.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPrescriptionStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prescriptionStatusRepository.findAll().size();

        // Create the PrescriptionStatus with an existing ID
        prescriptionStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrescriptionStatusMockMvc.perform(post("/api/prescription-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionStatus)))
            .andExpect(status().isBadRequest());

        // Validate the PrescriptionStatus in the database
        List<PrescriptionStatus> prescriptionStatusList = prescriptionStatusRepository.findAll();
        assertThat(prescriptionStatusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrescriptionStatuses() throws Exception {
        // Initialize the database
        prescriptionStatusRepository.saveAndFlush(prescriptionStatus);

        // Get all the prescriptionStatusList
        restPrescriptionStatusMockMvc.perform(get("/api/prescription-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prescriptionStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getPrescriptionStatus() throws Exception {
        // Initialize the database
        prescriptionStatusRepository.saveAndFlush(prescriptionStatus);

        // Get the prescriptionStatus
        restPrescriptionStatusMockMvc.perform(get("/api/prescription-statuses/{id}", prescriptionStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prescriptionStatus.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingPrescriptionStatus() throws Exception {
        // Get the prescriptionStatus
        restPrescriptionStatusMockMvc.perform(get("/api/prescription-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrescriptionStatus() throws Exception {
        // Initialize the database
        prescriptionStatusRepository.saveAndFlush(prescriptionStatus);

        int databaseSizeBeforeUpdate = prescriptionStatusRepository.findAll().size();

        // Update the prescriptionStatus
        PrescriptionStatus updatedPrescriptionStatus = prescriptionStatusRepository.findById(prescriptionStatus.getId()).get();
        // Disconnect from session so that the updates on updatedPrescriptionStatus are not directly saved in db
        em.detach(updatedPrescriptionStatus);
        updatedPrescriptionStatus
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restPrescriptionStatusMockMvc.perform(put("/api/prescription-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrescriptionStatus)))
            .andExpect(status().isOk());

        // Validate the PrescriptionStatus in the database
        List<PrescriptionStatus> prescriptionStatusList = prescriptionStatusRepository.findAll();
        assertThat(prescriptionStatusList).hasSize(databaseSizeBeforeUpdate);
        PrescriptionStatus testPrescriptionStatus = prescriptionStatusList.get(prescriptionStatusList.size() - 1);
        assertThat(testPrescriptionStatus.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testPrescriptionStatus.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPrescriptionStatus() throws Exception {
        int databaseSizeBeforeUpdate = prescriptionStatusRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrescriptionStatusMockMvc.perform(put("/api/prescription-statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionStatus)))
            .andExpect(status().isBadRequest());

        // Validate the PrescriptionStatus in the database
        List<PrescriptionStatus> prescriptionStatusList = prescriptionStatusRepository.findAll();
        assertThat(prescriptionStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrescriptionStatus() throws Exception {
        // Initialize the database
        prescriptionStatusRepository.saveAndFlush(prescriptionStatus);

        int databaseSizeBeforeDelete = prescriptionStatusRepository.findAll().size();

        // Delete the prescriptionStatus
        restPrescriptionStatusMockMvc.perform(delete("/api/prescription-statuses/{id}", prescriptionStatus.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrescriptionStatus> prescriptionStatusList = prescriptionStatusRepository.findAll();
        assertThat(prescriptionStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
