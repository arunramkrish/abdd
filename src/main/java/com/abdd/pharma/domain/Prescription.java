package com.abdd.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Prescription.
 */
@Entity
@Table(name = "prescription")
public class Prescription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "prescription_issued_date")
    private LocalDate prescriptionIssuedDate;

    @Column(name = "prescription_filled_date")
    private LocalDate prescriptionFilledDate;

    @Column(name = "other_details")
    private String otherDetails;

    @OneToMany(mappedBy = "prescription")
    private Set<PrescriptionItem> items = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "prescriptions", allowSetters = true)
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties(value = "prescriptions", allowSetters = true)
    private Doctor doctor;

    @ManyToOne
    @JsonIgnoreProperties(value = "prescriptions", allowSetters = true)
    private PrescriptionStatus status;

    @ManyToOne
    @JsonIgnoreProperties(value = "prescriptions", allowSetters = true)
    private PaymentMethods paymentMethods;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPrescriptionIssuedDate() {
        return prescriptionIssuedDate;
    }

    public Prescription prescriptionIssuedDate(LocalDate prescriptionIssuedDate) {
        this.prescriptionIssuedDate = prescriptionIssuedDate;
        return this;
    }

    public void setPrescriptionIssuedDate(LocalDate prescriptionIssuedDate) {
        this.prescriptionIssuedDate = prescriptionIssuedDate;
    }

    public LocalDate getPrescriptionFilledDate() {
        return prescriptionFilledDate;
    }

    public Prescription prescriptionFilledDate(LocalDate prescriptionFilledDate) {
        this.prescriptionFilledDate = prescriptionFilledDate;
        return this;
    }

    public void setPrescriptionFilledDate(LocalDate prescriptionFilledDate) {
        this.prescriptionFilledDate = prescriptionFilledDate;
    }

    public String getOtherDetails() {
        return otherDetails;
    }

    public Prescription otherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
        return this;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }

    public Set<PrescriptionItem> getItems() {
        return items;
    }

    public Prescription items(Set<PrescriptionItem> prescriptionItems) {
        this.items = prescriptionItems;
        return this;
    }

    public Prescription addItems(PrescriptionItem prescriptionItem) {
        this.items.add(prescriptionItem);
        prescriptionItem.setPrescription(this);
        return this;
    }

    public Prescription removeItems(PrescriptionItem prescriptionItem) {
        this.items.remove(prescriptionItem);
        prescriptionItem.setPrescription(null);
        return this;
    }

    public void setItems(Set<PrescriptionItem> prescriptionItems) {
        this.items = prescriptionItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Prescription customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public Prescription doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public PrescriptionStatus getStatus() {
        return status;
    }

    public Prescription status(PrescriptionStatus prescriptionStatus) {
        this.status = prescriptionStatus;
        return this;
    }

    public void setStatus(PrescriptionStatus prescriptionStatus) {
        this.status = prescriptionStatus;
    }

    public PaymentMethods getPaymentMethods() {
        return paymentMethods;
    }

    public Prescription paymentMethods(PaymentMethods paymentMethods) {
        this.paymentMethods = paymentMethods;
        return this;
    }

    public void setPaymentMethods(PaymentMethods paymentMethods) {
        this.paymentMethods = paymentMethods;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prescription)) {
            return false;
        }
        return id != null && id.equals(((Prescription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prescription{" +
            "id=" + getId() +
            ", prescriptionIssuedDate='" + getPrescriptionIssuedDate() + "'" +
            ", prescriptionFilledDate='" + getPrescriptionFilledDate() + "'" +
            ", otherDetails='" + getOtherDetails() + "'" +
            "}";
    }
}
