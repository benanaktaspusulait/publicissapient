package com.publicissapient.assigment.repository;

import com.publicissapient.assigment.model.dto.CreditCardDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardDTORepository extends JpaRepository<CreditCardDTO, Long> {

}
