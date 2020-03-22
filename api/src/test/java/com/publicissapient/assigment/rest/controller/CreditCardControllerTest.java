package com.publicissapient.assigment.rest.controller;

import com.github.javafaker.Faker;
import com.publicissapient.assigment.constants.ConstantsTest;
import com.publicissapient.assigment.controller.CreditCardController;
import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@RunWith(SpringRunner.class)
@WebMvcTest(CreditCardController.class)
public class CreditCardControllerTest extends AbstractControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldReturnAllCreditCards() throws Exception {
        this.mockMvc.perform(get(Constants.API_PREFIX + ConstantsTest.URL_CREDIT_CARDS))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCreateCreditCard() throws Exception {

        Faker faker = new Faker();

        CreditCardDTO dto = new CreditCardDTO(1L, faker.friends().character(), new BigDecimal(0), faker.business().creditCardNumber());
        String inputJson = mapToJson(dto);

        this.mockMvc.perform( MockMvcRequestBuilders
                .post(Constants.API_PREFIX + ConstantsTest.URL_CREDIT_CARDS)
                .content(inputJson)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(jsonPath("$.message").value("saved"));
    }
}