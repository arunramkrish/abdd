package com.abdd.pharma.repository;

import com.abdd.pharma.domain.PrescriptionItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PrescriptionItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrescriptionItemRepository extends JpaRepository<PrescriptionItem, Long> {
}
