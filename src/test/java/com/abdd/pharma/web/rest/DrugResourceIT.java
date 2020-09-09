package com.abdd.pharma.web.rest;

import com.abdd.pharma.AbddApp;
import com.abdd.pharma.domain.Drug;
import com.abdd.pharma.repository.DrugRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DrugResource} REST controller.
 */
@SpringBootTest(classes = AbddApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DrugResourceIT {

    private static final String DEFAULT_DRUG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DRUG_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_DRUG_COST = 1F;
    private static final Float UPDATED_DRUG_COST = 2F;

    private static final LocalDate DEFAULT_DRUG_AAVAILABLE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DRUG_AAVAILABLE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DRUG_WITHDRAWN_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DRUG_WITHDRAWN_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DRUG_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DRUG_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_GENERIC_YN = "AAAAAAAAAA";
    private static final String UPDATED_GENERIC_YN = "BBBBBBBBBB";

    private static final String DEFAULT_DRUG_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DRUG_DETAILS = "BBBBBBBBBB";

    @Autowired
    private DrugRepository drugRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDrugMockMvc;

    private Drug drug;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drug createEntity(EntityManager em) {
        Drug drug = new Drug()
            .drugName(DEFAULT_DRUG_NAME)
            .drugCost(DEFAULT_DRUG_COST)
            .drugAavailableDate(DEFAULT_DRUG_AAVAILABLE_DATE)
            .drugWithdrawnDate(DEFAULT_DRUG_WITHDRAWN_DATE)
            .drugDescription(DEFAULT_DRUG_DESCRIPTION)
            .genericYn(DEFAULT_GENERIC_YN)
            .drugDetails(DEFAULT_DRUG_DETAILS);
        return drug;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drug createUpdatedEntity(EntityManager em) {
        Drug drug = new Drug()
            .drugName(UPDATED_DRUG_NAME)
            .drugCost(UPDATED_DRUG_COST)
            .drugAavailableDate(UPDATED_DRUG_AAVAILABLE_DATE)
            .drugWithdrawnDate(UPDATED_DRUG_WITHDRAWN_DATE)
            .drugDescription(UPDATED_DRUG_DESCRIPTION)
            .genericYn(UPDATED_GENERIC_YN)
            .drugDetails(UPDATED_DRUG_DETAILS);
        return drug;
    }

    @BeforeEach
    public void initTest() {
        drug = createEntity(em);
    }

    @Test
    @Transactional
    public void createDrug() throws Exception {
        int databaseSizeBeforeCreate = drugRepository.findAll().size();
        // Create the Drug
        restDrugMockMvc.perform(post("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isCreated());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeCreate + 1);
        Drug testDrug = drugList.get(drugList.size() - 1);
        assertThat(testDrug.getDrugName()).isEqualTo(DEFAULT_DRUG_NAME);
        assertThat(testDrug.getDrugCost()).isEqualTo(DEFAULT_DRUG_COST);
        assertThat(testDrug.getDrugAavailableDate()).isEqualTo(DEFAULT_DRUG_AAVAILABLE_DATE);
        assertThat(testDrug.getDrugWithdrawnDate()).isEqualTo(DEFAULT_DRUG_WITHDRAWN_DATE);
        assertThat(testDrug.getDrugDescription()).isEqualTo(DEFAULT_DRUG_DESCRIPTION);
        assertThat(testDrug.getGenericYn()).isEqualTo(DEFAULT_GENERIC_YN);
        assertThat(testDrug.getDrugDetails()).isEqualTo(DEFAULT_DRUG_DETAILS);
    }

    @Test
    @Transactional
    public void createDrugWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugRepository.findAll().size();

        // Create the Drug with an existing ID
        drug.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugMockMvc.perform(post("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isBadRequest());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDrugs() throws Exception {
        // Initialize the database
        drugRepository.saveAndFlush(drug);

        // Get all the drugList
        restDrugMockMvc.perform(get("/api/drugs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drug.getId().intValue())))
            .andExpect(jsonPath("$.[*].drugName").value(hasItem(DEFAULT_DRUG_NAME)))
            .andExpect(jsonPath("$.[*].drugCost").value(hasItem(DEFAULT_DRUG_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].drugAavailableDate").value(hasItem(DEFAULT_DRUG_AAVAILABLE_DATE.toString())))
            .andExpect(jsonPath("$.[*].drugWithdrawnDate").value(hasItem(DEFAULT_DRUG_WITHDRAWN_DATE.toString())))
            .andExpect(jsonPath("$.[*].drugDescription").value(hasItem(DEFAULT_DRUG_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].genericYn").value(hasItem(DEFAULT_GENERIC_YN)))
            .andExpect(jsonPath("$.[*].drugDetails").value(hasItem(DEFAULT_DRUG_DETAILS)));
    }
    
    @Test
    @Transactional
    public void getDrug() throws Exception {
        // Initialize the database
        drugRepository.saveAndFlush(drug);

        // Get the drug
        restDrugMockMvc.perform(get("/api/drugs/{id}", drug.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(drug.getId().intValue()))
            .andExpect(jsonPath("$.drugName").value(DEFAULT_DRUG_NAME))
            .andExpect(jsonPath("$.drugCost").value(DEFAULT_DRUG_COST.doubleValue()))
            .andExpect(jsonPath("$.drugAavailableDate").value(DEFAULT_DRUG_AAVAILABLE_DATE.toString()))
            .andExpect(jsonPath("$.drugWithdrawnDate").value(DEFAULT_DRUG_WITHDRAWN_DATE.toString()))
            .andExpect(jsonPath("$.drugDescription").value(DEFAULT_DRUG_DESCRIPTION))
            .andExpect(jsonPath("$.genericYn").value(DEFAULT_GENERIC_YN))
            .andExpect(jsonPath("$.drugDetails").value(DEFAULT_DRUG_DETAILS));
    }
    @Test
    @Transactional
    public void getNonExistingDrug() throws Exception {
        // Get the drug
        restDrugMockMvc.perform(get("/api/drugs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDrug() throws Exception {
        // Initialize the database
        drugRepository.saveAndFlush(drug);

        int databaseSizeBeforeUpdate = drugRepository.findAll().size();

        // Update the drug
        Drug updatedDrug = drugRepository.findById(drug.getId()).get();
        // Disconnect from session so that the updates on updatedDrug are not directly saved in db
        em.detach(updatedDrug);
        updatedDrug
            .drugName(UPDATED_DRUG_NAME)
            .drugCost(UPDATED_DRUG_COST)
            .drugAavailableDate(UPDATED_DRUG_AAVAILABLE_DATE)
            .drugWithdrawnDate(UPDATED_DRUG_WITHDRAWN_DATE)
            .drugDescription(UPDATED_DRUG_DESCRIPTION)
            .genericYn(UPDATED_GENERIC_YN)
            .drugDetails(UPDATED_DRUG_DETAILS);

        restDrugMockMvc.perform(put("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrug)))
            .andExpect(status().isOk());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeUpdate);
        Drug testDrug = drugList.get(drugList.size() - 1);
        assertThat(testDrug.getDrugName()).isEqualTo(UPDATED_DRUG_NAME);
        assertThat(testDrug.getDrugCost()).isEqualTo(UPDATED_DRUG_COST);
        assertThat(testDrug.getDrugAavailableDate()).isEqualTo(UPDATED_DRUG_AAVAILABLE_DATE);
        assertThat(testDrug.getDrugWithdrawnDate()).isEqualTo(UPDATED_DRUG_WITHDRAWN_DATE);
        assertThat(testDrug.getDrugDescription()).isEqualTo(UPDATED_DRUG_DESCRIPTION);
        assertThat(testDrug.getGenericYn()).isEqualTo(UPDATED_GENERIC_YN);
        assertThat(testDrug.getDrugDetails()).isEqualTo(UPDATED_DRUG_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingDrug() throws Exception {
        int databaseSizeBeforeUpdate = drugRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugMockMvc.perform(put("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isBadRequest());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDrug() throws Exception {
        // Initialize the database
        drugRepository.saveAndFlush(drug);

        int databaseSizeBeforeDelete = drugRepository.findAll().size();

        // Delete the drug
        restDrugMockMvc.perform(delete("/api/drugs/{id}", drug.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
