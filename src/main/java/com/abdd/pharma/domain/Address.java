package com.abdd.pharma.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "line_1_building_number")
    private String line1BuildingNumber;

    @Column(name = "line_street_number")
    private String lineStreetNumber;

    @Column(name = "line_locality")
    private String lineLocality;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_postcode")
    private String zipPostcode;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLine1BuildingNumber() {
        return line1BuildingNumber;
    }

    public Address line1BuildingNumber(String line1BuildingNumber) {
        this.line1BuildingNumber = line1BuildingNumber;
        return this;
    }

    public void setLine1BuildingNumber(String line1BuildingNumber) {
        this.line1BuildingNumber = line1BuildingNumber;
    }

    public String getLineStreetNumber() {
        return lineStreetNumber;
    }

    public Address lineStreetNumber(String lineStreetNumber) {
        this.lineStreetNumber = lineStreetNumber;
        return this;
    }

    public void setLineStreetNumber(String lineStreetNumber) {
        this.lineStreetNumber = lineStreetNumber;
    }

    public String getLineLocality() {
        return lineLocality;
    }

    public Address lineLocality(String lineLocality) {
        this.lineLocality = lineLocality;
        return this;
    }

    public void setLineLocality(String lineLocality) {
        this.lineLocality = lineLocality;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipPostcode() {
        return zipPostcode;
    }

    public Address zipPostcode(String zipPostcode) {
        this.zipPostcode = zipPostcode;
        return this;
    }

    public void setZipPostcode(String zipPostcode) {
        this.zipPostcode = zipPostcode;
    }

    public String getState() {
        return state;
    }

    public Address state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public Address country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", line1BuildingNumber='" + getLine1BuildingNumber() + "'" +
            ", lineStreetNumber='" + getLineStreetNumber() + "'" +
            ", lineLocality='" + getLineLocality() + "'" +
            ", city='" + getCity() + "'" +
            ", zipPostcode='" + getZipPostcode() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
