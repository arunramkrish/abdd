package com.abdd.pharma.repository;

import com.abdd.pharma.domain.DrugCompany;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DrugCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrugCompanyRepository extends JpaRepository<DrugCompany, Long> {
}
