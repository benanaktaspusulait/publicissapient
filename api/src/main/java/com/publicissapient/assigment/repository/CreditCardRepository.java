package com.publicissapient.assigment.repository;

import com.publicissapient.assigment.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *Repository for CreditCard
 */
@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
}

