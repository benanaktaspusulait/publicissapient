package com.publicissapient.assigment.service;

import com.publicissapient.assigment.mapper.CreditCardMapper;
import com.publicissapient.assigment.model.CreditCard;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CreditCardMapper creditCardMapper;

    public CreditCardDTO findOne(Long id) {

        return creditCardMapper.toDto(creditCardRepository.getOne(id));
    }

    public CreditCard save(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }

}
