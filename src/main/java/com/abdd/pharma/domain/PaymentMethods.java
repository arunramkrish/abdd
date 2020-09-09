package com.abdd.pharma.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A PaymentMethods.
 */
@Entity
@Table(name = "payment_methods")
public class PaymentMethods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "pmt_method_desc")
    private String pmtMethodDesc;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public PaymentMethods code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPmtMethodDesc() {
        return pmtMethodDesc;
    }

    public PaymentMethods pmtMethodDesc(String pmtMethodDesc) {
        this.pmtMethodDesc = pmtMethodDesc;
        return this;
    }

    public void setPmtMethodDesc(String pmtMethodDesc) {
        this.pmtMethodDesc = pmtMethodDesc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentMethods)) {
            return false;
        }
        return id != null && id.equals(((PaymentMethods) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentMethods{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", pmtMethodDesc='" + getPmtMethodDesc() + "'" +
            "}";
    }
}
