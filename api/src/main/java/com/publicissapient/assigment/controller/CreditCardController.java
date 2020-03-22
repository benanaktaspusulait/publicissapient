package com.publicissapient.assigment.controller;

import com.publicissapient.assigment.model.dto.CreditCardDTO;
import com.publicissapient.assigment.service.CreditCardService;
import com.publicissapient.assigment.util.Constants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(Constants.API_PREFIX + "/api/creditCards")
@Api(tags = Constants.API_PREFIX + "/api/creditCards")
public class CreditCardController {

    @Autowired
    private CreditCardService creditCardService;

    @ApiOperation(value = "Add a user")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid CreditCardDTO dto) {

        log.debug("Create user", dto);
        return new ResponseEntity<>(creditCardService.save(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getUsers(Pageable pageable) {
        return new ResponseEntity<>(creditCardService.findAll(pageable), HttpStatus.OK);
    }


}
