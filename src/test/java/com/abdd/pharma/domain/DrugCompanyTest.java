package com.abdd.pharma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.abdd.pharma.web.rest.TestUtil;

public class DrugCompanyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DrugCompany.class);
        DrugCompany drugCompany1 = new DrugCompany();
        drugCompany1.setId(1L);
        DrugCompany drugCompany2 = new DrugCompany();
        drugCompany2.setId(drugCompany1.getId());
        assertThat(drugCompany1).isEqualTo(drugCompany2);
        drugCompany2.setId(2L);
        assertThat(drugCompany1).isNotEqualTo(drugCompany2);
        drugCompany1.setId(null);
        assertThat(drugCompany1).isNotEqualTo(drugCompany2);
    }
}
