package com.publicissapient.assigment.model.dto;

import com.publicissapient.assigment.annotation.CreditCardLuhnValidator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardDTO extends BaseDTO {

    private Long id;
    private @NotNull String nameOnCard;
    private @NotNull BigDecimal balance;

    private @NotNull
    @CreditCardLuhnValidator
    String cardNumber;
}
