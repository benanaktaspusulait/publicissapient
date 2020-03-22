package com.publicissapient.assigment.model;

import com.github.javafaker.Faker;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import org.junit.Test;

import java.math.BigDecimal;

import static junit.framework.TestCase.assertNotNull;

public class CreditCardTest {

    Faker faker = new Faker();

    @Test
    public void shouldAssignIdWhenCreated() {
        CreditCardDTO classUnderTest = new CreditCardDTO(1L, faker.friends().character(), new BigDecimal(0), faker.business().creditCardNumber());
        assertNotNull(classUnderTest.getId());
    }

}
