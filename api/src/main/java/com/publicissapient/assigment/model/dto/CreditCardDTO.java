package com.publicissapient.assigment.model.dto;

import com.publicissapient.assigment.annotation.CreditCardLuhnValidator;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@RedisHash("creditCards")
public class CreditCardDTO extends BaseDTO{

    @Indexed
    private Long id;
    @NotNull
    private String name;

    @NotNull
    private BigDecimal balance;

    @NotNull
    @CreditCardLuhnValidator
    private String cardNumber;
}
