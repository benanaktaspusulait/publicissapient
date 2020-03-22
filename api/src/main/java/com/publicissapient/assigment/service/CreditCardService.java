package com.publicissapient.assigment.service;

import com.publicissapient.assigment.mapper.CreditCardMapper;
import com.publicissapient.assigment.model.CreditCard;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.repository.CreditCardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CreditCardMapper creditCardMapper;


    public CreditCard save(CreditCardDTO dto) {
        return creditCardRepository.save(creditCardMapper.toEntity(dto));
    }

    public Page<CreditCardDTO> findAll(Pageable pageable) {
        return creditCardRepository.findAll(pageable).map(creditCard -> creditCardMapper.toDto(creditCard));
    }

    public List<CreditCardDTO> findAll() {
        return creditCardRepository.findAll().stream().
                        map(creditCard -> creditCardMapper.toDto(creditCard)).collect(Collectors.toList());
    }
}
