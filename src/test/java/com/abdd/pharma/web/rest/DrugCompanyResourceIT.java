package com.abdd.pharma.web.rest;

import com.abdd.pharma.AbddApp;
import com.abdd.pharma.domain.DrugCompany;
import com.abdd.pharma.repository.DrugCompanyRepository;

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
 * Integration tests for the {@link DrugCompanyResource} REST controller.
 */
@SpringBootTest(classes = AbddApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DrugCompanyResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_DETAILS = "BBBBBBBBBB";

    @Autowired
    private DrugCompanyRepository drugCompanyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDrugCompanyMockMvc;

    private DrugCompany drugCompany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DrugCompany createEntity(EntityManager em) {
        DrugCompany drugCompany = new DrugCompany()
            .companyName(DEFAULT_COMPANY_NAME)
            .companyDetails(DEFAULT_COMPANY_DETAILS);
        return drugCompany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DrugCompany createUpdatedEntity(EntityManager em) {
        DrugCompany drugCompany = new DrugCompany()
            .companyName(UPDATED_COMPANY_NAME)
            .companyDetails(UPDATED_COMPANY_DETAILS);
        return drugCompany;
    }

    @BeforeEach
    public void initTest() {
        drugCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createDrugCompany() throws Exception {
        int databaseSizeBeforeCreate = drugCompanyRepository.findAll().size();
        // Create the DrugCompany
        restDrugCompanyMockMvc.perform(post("/api/drug-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugCompany)))
            .andExpect(status().isCreated());

        // Validate the DrugCompany in the database
        List<DrugCompany> drugCompanyList = drugCompanyRepository.findAll();
        assertThat(drugCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        DrugCompany testDrugCompany = drugCompanyList.get(drugCompanyList.size() - 1);
        assertThat(testDrugCompany.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testDrugCompany.getCompanyDetails()).isEqualTo(DEFAULT_COMPANY_DETAILS);
    }

    @Test
    @Transactional
    public void createDrugCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugCompanyRepository.findAll().size();

        // Create the DrugCompany with an existing ID
        drugCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugCompanyMockMvc.perform(post("/api/drug-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugCompany)))
            .andExpect(status().isBadRequest());

        // Validate the DrugCompany in the database
        List<DrugCompany> drugCompanyList = drugCompanyRepository.findAll();
        assertThat(drugCompanyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDrugCompanies() throws Exception {
        // Initialize the database
        drugCompanyRepository.saveAndFlush(drugCompany);

        // Get all the drugCompanyList
        restDrugCompanyMockMvc.perform(get("/api/drug-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drugCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].companyDetails").value(hasItem(DEFAULT_COMPANY_DETAILS)));
    }
    
    @Test
    @Transactional
    public void getDrugCompany() throws Exception {
        // Initialize the database
        drugCompanyRepository.saveAndFlush(drugCompany);

        // Get the drugCompany
        restDrugCompanyMockMvc.perform(get("/api/drug-companies/{id}", drugCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(drugCompany.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.companyDetails").value(DEFAULT_COMPANY_DETAILS));
    }
    @Test
    @Transactional
    public void getNonExistingDrugCompany() throws Exception {
        // Get the drugCompany
        restDrugCompanyMockMvc.perform(get("/api/drug-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDrugCompany() throws Exception {
        // Initialize the database
        drugCompanyRepository.saveAndFlush(drugCompany);

        int databaseSizeBeforeUpdate = drugCompanyRepository.findAll().size();

        // Update the drugCompany
        DrugCompany updatedDrugCompany = drugCompanyRepository.findById(drugCompany.getId()).get();
        // Disconnect from session so that the updates on updatedDrugCompany are not directly saved in db
        em.detach(updatedDrugCompany);
        updatedDrugCompany
            .companyName(UPDATED_COMPANY_NAME)
            .companyDetails(UPDATED_COMPANY_DETAILS);

        restDrugCompanyMockMvc.perform(put("/api/drug-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrugCompany)))
            .andExpect(status().isOk());

        // Validate the DrugCompany in the database
        List<DrugCompany> drugCompanyList = drugCompanyRepository.findAll();
        assertThat(drugCompanyList).hasSize(databaseSizeBeforeUpdate);
        DrugCompany testDrugCompany = drugCompanyList.get(drugCompanyList.size() - 1);
        assertThat(testDrugCompany.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testDrugCompany.getCompanyDetails()).isEqualTo(UPDATED_COMPANY_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingDrugCompany() throws Exception {
        int databaseSizeBeforeUpdate = drugCompanyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugCompanyMockMvc.perform(put("/api/drug-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugCompany)))
            .andExpect(status().isBadRequest());

        // Validate the DrugCompany in the database
        List<DrugCompany> drugCompanyList = drugCompanyRepository.findAll();
        assertThat(drugCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDrugCompany() throws Exception {
        // Initialize the database
        drugCompanyRepository.saveAndFlush(drugCompany);

        int databaseSizeBeforeDelete = drugCompanyRepository.findAll().size();

        // Delete the drugCompany
        restDrugCompanyMockMvc.perform(delete("/api/drug-companies/{id}", drugCompany.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DrugCompany> drugCompanyList = drugCompanyRepository.findAll();
        assertThat(drugCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
