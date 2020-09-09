package com.abdd.pharma.repository;

import com.abdd.pharma.domain.PrescriptionStatus;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PrescriptionStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrescriptionStatusRepository extends JpaRepository<PrescriptionStatus, Long> {
}
