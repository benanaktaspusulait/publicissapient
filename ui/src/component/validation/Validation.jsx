import validator from 'validator';

export function validateField(rule, boundary, value) {
    value = (value !== 0 && !value ? '' : value.toString());
    let result = {valid: true, message: ''};
    if (boundary !== undefined) {
        let limit = boundary.split(',');

        if ((parseInt(limit[0]) > 0) && (value.length === 0)) {
            return result = {valid: false, message: ' field can not empty!'}
        }
        if (parseInt(limit[0]) > value.length) {
            return result = {valid: false, message: ' Field min ' + limit[0] + ' character.'}
        }
        if ((parseInt(limit[1]) !== 0) && (parseInt(limit[1]) < value.length)) {
            return result = {valid: false, message: ' Field max ' + limit[1] + ' character.'}
        } else {
            if (rule !== undefined) {
                if (rule.endsWith('Moment')) {
                    return result = getValidationResult(rule, boundary, value, '');
                } else {
                    return result = getValidationResult(rule, true, value, '');
                }
            }
        }
    } else {
        if (rule !== undefined)
            return result = getValidationResult(rule, true, value, '');

    }
    return result;
}

export function validateComponent(obj) {
    let error = obj.state.error;
    var refs = obj.refs;
    var isValid = true;
    for (var key in refs) {
        var ref = refs[key];
        if (ref.props) {
            let rule = null;
            let boundary = null;
            let result = null;
            if (ref.props.inputProps && ref.props.inputProps.dataset) {
                rule = ref.props.inputProps.dataset.vdata;
                boundary = ref.props.inputProps.dataset.vlength
                result = validateField(rule, boundary, (ref.props.inputProps.dataset.value === undefined ? '' : ref.props.inputProps.dataset.value));
            } else {
                rule = ref.props.inputProps.vdata;
                boundary = ref.props.inputProps.vlength
                result = validateField(rule, boundary, (ref.props.value === undefined ? '' : ref.props.value));
            }
            error = Object.assign(error, {[key]: result});
            if (!result.valid)
                isValid = false;
        } else {
            let rule = ref.dataset.vdata;
            let boundary = ref.dataset.vlength;
            let result = validateField(rule, boundary, (ref.value === undefined ? '' : ref.value));
            error = Object.assign(error, {[key]: result});
            if (!result.valid)
                isValid = false;
        }

    }
    return {valid: isValid, error: error};
}

export function getValidationResult(ruleKey, ruleValue, value, label) {
    let result = {valid: true, message: ''};
    switch (ruleKey) {
        case 'required':
            result.valid = (ruleValue === false ? true : (!validator.isEmpty(value)));
            result.message = result.valid === true ? '' : `${label} is required.`;
            break;
        case 'maxLength':
            result.valid = validator.isLength(value, {max: ruleValue});
            result.message = result.valid === true ? '' : label + ' max ' + ruleValue + ' character.';
            break;
        case 'decimal':
            result.valid = ruleValue === false ? true : validator.isDecimal(value);
            result.message = result.valid === true ? '' : label + ' invalid number format.';
            break;
        case 'credit_card':
            result.valid = ruleValue === false ? true : valid_credit_card(value);
            result.message = result.valid === true ? '' : label + ' invalid credit card number.';
            break;
        default:
            result = {valid: true, message: ''};
    }
    return result;
}


function valid_credit_card(value) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}