
const { check, validationResult } = require('express-validator');

const emailValidationRules = () => {
    return [
        check('email')
            .isEmail()
            .withMessage('O email fornecido não é válido')
            .normalizeEmail(),
    ];
};

const validateEmail = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    emailValidationRules,
    validateEmail,
};
