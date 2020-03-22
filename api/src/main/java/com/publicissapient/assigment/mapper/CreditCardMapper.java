package com.publicissapient.assigment.mapper;

import com.publicissapient.assigment.model.CreditCard;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CreditCardMapper extends BaseEntityMapper<CreditCardDTO, CreditCard> {
}
