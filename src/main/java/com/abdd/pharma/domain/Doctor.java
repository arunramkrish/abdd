package com.abdd.pharma.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Doctor.
 */
@Entity
@Table(name = "doctor")
public class Doctor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "doctor_name")
    private String doctorName;

    @Column(name = "doctor_hospital")
    private String doctorHospital;

    @Column(name = "doctor_speciality")
    private String doctorSpeciality;

    @Column(name = "mobile_no")
    private String mobileNo;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public Doctor doctorName(String doctorName) {
        this.doctorName = doctorName;
        return this;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorHospital() {
        return doctorHospital;
    }

    public Doctor doctorHospital(String doctorHospital) {
        this.doctorHospital = doctorHospital;
        return this;
    }

    public void setDoctorHospital(String doctorHospital) {
        this.doctorHospital = doctorHospital;
    }

    public String getDoctorSpeciality() {
        return doctorSpeciality;
    }

    public Doctor doctorSpeciality(String doctorSpeciality) {
        this.doctorSpeciality = doctorSpeciality;
        return this;
    }

    public void setDoctorSpeciality(String doctorSpeciality) {
        this.doctorSpeciality = doctorSpeciality;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public Doctor mobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
        return this;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public Address getAddress() {
        return address;
    }

    public Doctor address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Doctor)) {
            return false;
        }
        return id != null && id.equals(((Doctor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Doctor{" +
            "id=" + getId() +
            ", doctorName='" + getDoctorName() + "'" +
            ", doctorHospital='" + getDoctorHospital() + "'" +
            ", doctorSpeciality='" + getDoctorSpeciality() + "'" +
            ", mobileNo='" + getMobileNo() + "'" +
            "}";
    }
}
