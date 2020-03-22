package com.publicissapient.assigment.rest.controller;

import com.publicissapient.assigment.constants.ConstantsTest;
import com.publicissapient.assigment.util.Constants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HttpRequestTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void shouldReturnAllCreditCards() {
        assertThat(
                this.restTemplate.getForObject(
                        ConstantsTest.HOST + port + Constants.API_PREFIX + "/creditcards",
                        String.class
                )
        ).contains("Mary");
    }
}