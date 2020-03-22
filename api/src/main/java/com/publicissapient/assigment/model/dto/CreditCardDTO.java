package com.publicissapient.assigment.model.dto;

import com.publicissapient.assigment.annotation.CreditCardLuhnValidator;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class CreditCardDTO extends BaseDTO {

    private Long id;
    private @NotNull String name;
    private @NotNull BigDecimal balance;

    private @NotNull
    @CreditCardLuhnValidator
    String cardNumber;
}
