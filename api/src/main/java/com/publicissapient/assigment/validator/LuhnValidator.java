package com.publicissapient.assigment.validator;

import com.publicissapient.assigment.annotation.CreditCardLuhnValidator;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Data
@Slf4j
public class LuhnValidator implements ConstraintValidator<CreditCardLuhnValidator, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
            int sum = 0;
            boolean alternate = false;
            for (int i = value.length() - 1; i >= 0; i--) {
                int n = Integer.parseInt(value.substring(i, i + 1));
                if (alternate) {
                    n *= 2;
                    if (n > 9) {
                        n = (n % 10) + 1;
                    }
                }
                sum += n;
                alternate = !alternate;
            }
            return (sum % 10 == 0);
    }
}