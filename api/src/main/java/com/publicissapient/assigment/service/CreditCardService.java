package com.publicissapient.assigment.service;

import com.publicissapient.assigment.mapper.CreditCardMapper;
import com.publicissapient.assigment.model.CreditCard;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.repository.CreditCardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * all service operations for credit card
 */
@Slf4j
@Service
public class CreditCardService {

    private CreditCardRepository creditCardRepository;
    private CreditCardMapper creditCardMapper;

    public CreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    public CreditCard save(CreditCardDTO dto) {
        return creditCardRepository.save(creditCardMapper.toEntity(dto));
    }

    public List<CreditCardDTO> findAll() {
        return creditCardRepository.findAll().stream().
                        map(creditCard -> creditCardMapper.toDto(creditCard)).collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id)  {
        creditCardRepository.deleteById(id);
    }
}
