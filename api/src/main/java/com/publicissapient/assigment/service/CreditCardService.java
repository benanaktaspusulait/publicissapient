package com.publicissapient.assigment.service;

import com.publicissapient.assigment.mapper.CreditCardMapper;
import com.publicissapient.assigment.model.CreditCard;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.repository.CreditCardDTORepository;
import com.publicissapient.assigment.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CreditCardDTORepository creditCardDTORepository;

    @Autowired
    private CreditCardMapper creditCardMapper;

    public CreditCardDTO findOne(Long id) {

        Optional<CreditCardDTO> opt = creditCardDTORepository.findById(id);
        if (opt.isPresent()){
            return opt.get();
        }
        return creditCardMapper.toDto(creditCardRepository.getOne(id));
    }

    public CreditCard save(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }

}
