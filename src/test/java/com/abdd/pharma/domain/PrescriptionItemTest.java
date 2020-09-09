package com.abdd.pharma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.abdd.pharma.web.rest.TestUtil;

public class PrescriptionItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrescriptionItem.class);
        PrescriptionItem prescriptionItem1 = new PrescriptionItem();
        prescriptionItem1.setId(1L);
        PrescriptionItem prescriptionItem2 = new PrescriptionItem();
        prescriptionItem2.setId(prescriptionItem1.getId());
        assertThat(prescriptionItem1).isEqualTo(prescriptionItem2);
        prescriptionItem2.setId(2L);
        assertThat(prescriptionItem1).isNotEqualTo(prescriptionItem2);
        prescriptionItem1.setId(null);
        assertThat(prescriptionItem1).isNotEqualTo(prescriptionItem2);
    }
}
