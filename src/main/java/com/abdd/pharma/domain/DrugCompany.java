package com.abdd.pharma.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A DrugCompany.
 */
@Entity
@Table(name = "drug_company")
public class DrugCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_details")
    private String companyDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public DrugCompany companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyDetails() {
        return companyDetails;
    }

    public DrugCompany companyDetails(String companyDetails) {
        this.companyDetails = companyDetails;
        return this;
    }

    public void setCompanyDetails(String companyDetails) {
        this.companyDetails = companyDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DrugCompany)) {
            return false;
        }
        return id != null && id.equals(((DrugCompany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DrugCompany{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", companyDetails='" + getCompanyDetails() + "'" +
            "}";
    }
}
