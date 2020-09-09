package com.abdd.pharma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.abdd.pharma.web.rest.TestUtil;

public class PrescriptionStatusTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrescriptionStatus.class);
        PrescriptionStatus prescriptionStatus1 = new PrescriptionStatus();
        prescriptionStatus1.setId(1L);
        PrescriptionStatus prescriptionStatus2 = new PrescriptionStatus();
        prescriptionStatus2.setId(prescriptionStatus1.getId());
        assertThat(prescriptionStatus1).isEqualTo(prescriptionStatus2);
        prescriptionStatus2.setId(2L);
        assertThat(prescriptionStatus1).isNotEqualTo(prescriptionStatus2);
        prescriptionStatus1.setId(null);
        assertThat(prescriptionStatus1).isNotEqualTo(prescriptionStatus2);
    }
}
