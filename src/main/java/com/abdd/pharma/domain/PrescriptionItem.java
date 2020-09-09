package com.abdd.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PrescriptionItem.
 */
@Entity
@Table(name = "prescription_item")
public class PrescriptionItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "prescription_qty")
    private Float prescriptionQty;

    @Column(name = "instructions_to_customer")
    private String instructionsToCustomer;

    @ManyToOne
    @JsonIgnoreProperties(value = "prescriptionItems", allowSetters = true)
    private Drug drug;

    @ManyToOne
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private Prescription prescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrescriptionQty() {
        return prescriptionQty;
    }

    public PrescriptionItem prescriptionQty(Float prescriptionQty) {
        this.prescriptionQty = prescriptionQty;
        return this;
    }

    public void setPrescriptionQty(Float prescriptionQty) {
        this.prescriptionQty = prescriptionQty;
    }

    public String getInstructionsToCustomer() {
        return instructionsToCustomer;
    }

    public PrescriptionItem instructionsToCustomer(String instructionsToCustomer) {
        this.instructionsToCustomer = instructionsToCustomer;
        return this;
    }

    public void setInstructionsToCustomer(String instructionsToCustomer) {
        this.instructionsToCustomer = instructionsToCustomer;
    }

    public Drug getDrug() {
        return drug;
    }

    public PrescriptionItem drug(Drug drug) {
        this.drug = drug;
        return this;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public PrescriptionItem prescription(Prescription prescription) {
        this.prescription = prescription;
        return this;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PrescriptionItem)) {
            return false;
        }
        return id != null && id.equals(((PrescriptionItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PrescriptionItem{" +
            "id=" + getId() +
            ", prescriptionQty=" + getPrescriptionQty() +
            ", instructionsToCustomer='" + getInstructionsToCustomer() + "'" +
            "}";
    }
}
