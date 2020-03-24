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

        // SELECT MENU, DATA'YI PROPS ALTINDA TUTUYOR
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


export function validate(fieldName, value, rules, messages, label) {
    let result = objectRulesControl(rules[fieldName], value, label);
    messages[fieldName] = result.message;
    return {
        messages: messages,
        valid: checkValid(messages)
    }
}

function checkValid(messages) {
    let valid = true;
    for (var message in messages) {
        if (messages[message] !== '') {
            return false;
        }
    }
    return valid;
}

function objectRulesControl(rules, value, label) {
    let result = {state: true, message: ''};
    for (var rule in rules) {
        let ruleKey = rule;
        let ruleValue = rules[rule];
        result = getValidationResult(ruleKey, ruleValue, value, label);
        if (!result.state) {
            return result;
        }
    }
    return result;
}


export function validateCustom(booleanExpression, message) {
    return {valid: booleanExpression, message: (booleanExpression ? '' : message)};
}

export function getValidationResult(ruleKey, ruleValue, value, label) {
    let result = {valid: true, message: ''};
    switch (ruleKey) {
        case 'required':
            result.valid = (ruleValue === false ? true : (!validator.isEmpty(value)));
            result.message = result.valid === true ? '' : `${label} alanı zorunludur.`;
            break;
        case 'maxLength':
            result.valid = validator.isLength(value, {max: ruleValue});
            result.message = result.valid === true ? '' : label + ' max ' + ruleValue + ' character.';
            break;
        case 'decimal':
            result.valid = ruleValue === false ? true : validator.isDecimal(value);
            result.message = result.valid === true ? '' : label + ' invalid number format.';
            break;
        default:
            result = {valid: true, message: ''};
    }
    return result;
}

