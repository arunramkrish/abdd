package com.abdd.pharma.web.rest;

import com.abdd.pharma.AbddApp;
import com.abdd.pharma.domain.PrescriptionItem;
import com.abdd.pharma.repository.PrescriptionItemRepository;

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
 * Integration tests for the {@link PrescriptionItemResource} REST controller.
 */
@SpringBootTest(classes = AbddApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PrescriptionItemResourceIT {

    private static final Float DEFAULT_PRESCRIPTION_QTY = 1F;
    private static final Float UPDATED_PRESCRIPTION_QTY = 2F;

    private static final String DEFAULT_INSTRUCTIONS_TO_CUSTOMER = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCTIONS_TO_CUSTOMER = "BBBBBBBBBB";

    @Autowired
    private PrescriptionItemRepository prescriptionItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrescriptionItemMockMvc;

    private PrescriptionItem prescriptionItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrescriptionItem createEntity(EntityManager em) {
        PrescriptionItem prescriptionItem = new PrescriptionItem()
            .prescriptionQty(DEFAULT_PRESCRIPTION_QTY)
            .instructionsToCustomer(DEFAULT_INSTRUCTIONS_TO_CUSTOMER);
        return prescriptionItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrescriptionItem createUpdatedEntity(EntityManager em) {
        PrescriptionItem prescriptionItem = new PrescriptionItem()
            .prescriptionQty(UPDATED_PRESCRIPTION_QTY)
            .instructionsToCustomer(UPDATED_INSTRUCTIONS_TO_CUSTOMER);
        return prescriptionItem;
    }

    @BeforeEach
    public void initTest() {
        prescriptionItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrescriptionItem() throws Exception {
        int databaseSizeBeforeCreate = prescriptionItemRepository.findAll().size();
        // Create the PrescriptionItem
        restPrescriptionItemMockMvc.perform(post("/api/prescription-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionItem)))
            .andExpect(status().isCreated());

        // Validate the PrescriptionItem in the database
        List<PrescriptionItem> prescriptionItemList = prescriptionItemRepository.findAll();
        assertThat(prescriptionItemList).hasSize(databaseSizeBeforeCreate + 1);
        PrescriptionItem testPrescriptionItem = prescriptionItemList.get(prescriptionItemList.size() - 1);
        assertThat(testPrescriptionItem.getPrescriptionQty()).isEqualTo(DEFAULT_PRESCRIPTION_QTY);
        assertThat(testPrescriptionItem.getInstructionsToCustomer()).isEqualTo(DEFAULT_INSTRUCTIONS_TO_CUSTOMER);
    }

    @Test
    @Transactional
    public void createPrescriptionItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prescriptionItemRepository.findAll().size();

        // Create the PrescriptionItem with an existing ID
        prescriptionItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrescriptionItemMockMvc.perform(post("/api/prescription-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionItem)))
            .andExpect(status().isBadRequest());

        // Validate the PrescriptionItem in the database
        List<PrescriptionItem> prescriptionItemList = prescriptionItemRepository.findAll();
        assertThat(prescriptionItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrescriptionItems() throws Exception {
        // Initialize the database
        prescriptionItemRepository.saveAndFlush(prescriptionItem);

        // Get all the prescriptionItemList
        restPrescriptionItemMockMvc.perform(get("/api/prescription-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prescriptionItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].prescriptionQty").value(hasItem(DEFAULT_PRESCRIPTION_QTY.doubleValue())))
            .andExpect(jsonPath("$.[*].instructionsToCustomer").value(hasItem(DEFAULT_INSTRUCTIONS_TO_CUSTOMER)));
    }
    
    @Test
    @Transactional
    public void getPrescriptionItem() throws Exception {
        // Initialize the database
        prescriptionItemRepository.saveAndFlush(prescriptionItem);

        // Get the prescriptionItem
        restPrescriptionItemMockMvc.perform(get("/api/prescription-items/{id}", prescriptionItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prescriptionItem.getId().intValue()))
            .andExpect(jsonPath("$.prescriptionQty").value(DEFAULT_PRESCRIPTION_QTY.doubleValue()))
            .andExpect(jsonPath("$.instructionsToCustomer").value(DEFAULT_INSTRUCTIONS_TO_CUSTOMER));
    }
    @Test
    @Transactional
    public void getNonExistingPrescriptionItem() throws Exception {
        // Get the prescriptionItem
        restPrescriptionItemMockMvc.perform(get("/api/prescription-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrescriptionItem() throws Exception {
        // Initialize the database
        prescriptionItemRepository.saveAndFlush(prescriptionItem);

        int databaseSizeBeforeUpdate = prescriptionItemRepository.findAll().size();

        // Update the prescriptionItem
        PrescriptionItem updatedPrescriptionItem = prescriptionItemRepository.findById(prescriptionItem.getId()).get();
        // Disconnect from session so that the updates on updatedPrescriptionItem are not directly saved in db
        em.detach(updatedPrescriptionItem);
        updatedPrescriptionItem
            .prescriptionQty(UPDATED_PRESCRIPTION_QTY)
            .instructionsToCustomer(UPDATED_INSTRUCTIONS_TO_CUSTOMER);

        restPrescriptionItemMockMvc.perform(put("/api/prescription-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrescriptionItem)))
            .andExpect(status().isOk());

        // Validate the PrescriptionItem in the database
        List<PrescriptionItem> prescriptionItemList = prescriptionItemRepository.findAll();
        assertThat(prescriptionItemList).hasSize(databaseSizeBeforeUpdate);
        PrescriptionItem testPrescriptionItem = prescriptionItemList.get(prescriptionItemList.size() - 1);
        assertThat(testPrescriptionItem.getPrescriptionQty()).isEqualTo(UPDATED_PRESCRIPTION_QTY);
        assertThat(testPrescriptionItem.getInstructionsToCustomer()).isEqualTo(UPDATED_INSTRUCTIONS_TO_CUSTOMER);
    }

    @Test
    @Transactional
    public void updateNonExistingPrescriptionItem() throws Exception {
        int databaseSizeBeforeUpdate = prescriptionItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrescriptionItemMockMvc.perform(put("/api/prescription-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prescriptionItem)))
            .andExpect(status().isBadRequest());

        // Validate the PrescriptionItem in the database
        List<PrescriptionItem> prescriptionItemList = prescriptionItemRepository.findAll();
        assertThat(prescriptionItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrescriptionItem() throws Exception {
        // Initialize the database
        prescriptionItemRepository.saveAndFlush(prescriptionItem);

        int databaseSizeBeforeDelete = prescriptionItemRepository.findAll().size();

        // Delete the prescriptionItem
        restPrescriptionItemMockMvc.perform(delete("/api/prescription-items/{id}", prescriptionItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrescriptionItem> prescriptionItemList = prescriptionItemRepository.findAll();
        assertThat(prescriptionItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
