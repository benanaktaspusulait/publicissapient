package com.publicissapient.assigment.annotation;

import com.publicissapient.assigment.validator.LuhnValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;


@Constraint(validatedBy = {LuhnValidator.class})
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface CreditCardLuhnValidator {

    String message() default "{com.publicissapient.assigment.annotation.CreditCardLuhnValidator.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

