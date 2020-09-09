package com.abdd.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Drug.
 */
@Entity
@Table(name = "drug")
public class Drug implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "drug_name")
    private String drugName;

    @Column(name = "drug_cost")
    private Float drugCost;

    @Column(name = "drug_aavailable_date")
    private LocalDate drugAavailableDate;

    @Column(name = "drug_withdrawn_date")
    private LocalDate drugWithdrawnDate;

    @Column(name = "drug_description")
    private String drugDescription;

    @Column(name = "generic_yn")
    private String genericYn;

    @Column(name = "drug_details")
    private String drugDetails;

    @ManyToOne
    @JsonIgnoreProperties(value = "drugs", allowSetters = true)
    private DrugCompany company;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDrugName() {
        return drugName;
    }

    public Drug drugName(String drugName) {
        this.drugName = drugName;
        return this;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public Float getDrugCost() {
        return drugCost;
    }

    public Drug drugCost(Float drugCost) {
        this.drugCost = drugCost;
        return this;
    }

    public void setDrugCost(Float drugCost) {
        this.drugCost = drugCost;
    }

    public LocalDate getDrugAavailableDate() {
        return drugAavailableDate;
    }

    public Drug drugAavailableDate(LocalDate drugAavailableDate) {
        this.drugAavailableDate = drugAavailableDate;
        return this;
    }

    public void setDrugAavailableDate(LocalDate drugAavailableDate) {
        this.drugAavailableDate = drugAavailableDate;
    }

    public LocalDate getDrugWithdrawnDate() {
        return drugWithdrawnDate;
    }

    public Drug drugWithdrawnDate(LocalDate drugWithdrawnDate) {
        this.drugWithdrawnDate = drugWithdrawnDate;
        return this;
    }

    public void setDrugWithdrawnDate(LocalDate drugWithdrawnDate) {
        this.drugWithdrawnDate = drugWithdrawnDate;
    }

    public String getDrugDescription() {
        return drugDescription;
    }

    public Drug drugDescription(String drugDescription) {
        this.drugDescription = drugDescription;
        return this;
    }

    public void setDrugDescription(String drugDescription) {
        this.drugDescription = drugDescription;
    }

    public String getGenericYn() {
        return genericYn;
    }

    public Drug genericYn(String genericYn) {
        this.genericYn = genericYn;
        return this;
    }

    public void setGenericYn(String genericYn) {
        this.genericYn = genericYn;
    }

    public String getDrugDetails() {
        return drugDetails;
    }

    public Drug drugDetails(String drugDetails) {
        this.drugDetails = drugDetails;
        return this;
    }

    public void setDrugDetails(String drugDetails) {
        this.drugDetails = drugDetails;
    }

    public DrugCompany getCompany() {
        return company;
    }

    public Drug company(DrugCompany drugCompany) {
        this.company = drugCompany;
        return this;
    }

    public void setCompany(DrugCompany drugCompany) {
        this.company = drugCompany;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Drug)) {
            return false;
        }
        return id != null && id.equals(((Drug) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Drug{" +
            "id=" + getId() +
            ", drugName='" + getDrugName() + "'" +
            ", drugCost=" + getDrugCost() +
            ", drugAavailableDate='" + getDrugAavailableDate() + "'" +
            ", drugWithdrawnDate='" + getDrugWithdrawnDate() + "'" +
            ", drugDescription='" + getDrugDescription() + "'" +
            ", genericYn='" + getGenericYn() + "'" +
            ", drugDetails='" + getDrugDetails() + "'" +
            "}";
    }
}
