package com.publicissapient.assigment.model.dto;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.math.BigDecimal;

@Data
@RedisHash("creditCards")
public class CreditCardDTO extends BaseDTO{

    @Indexed
    private Long id;
    private String name;
    private BigDecimal balance;
    private String cardNumber;
}
