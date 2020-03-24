package com.publicissapient.assigment.model;

import com.publicissapient.assigment.model.base.BaseEntity;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * entity for credit card
 */
@Data
@Entity
@Table(name = "CREDIT_CARDS")
@ToString
public class CreditCard extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "BALANCE", length = 4096)
    private BigDecimal balance;

    @Column(name = "NAME_ON_CARD", length = 250)
    private String nameOnCard;

    @Column(name = "CARD_NUMBER", length = 250)
    private String cardNumber;

}