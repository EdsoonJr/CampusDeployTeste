const { check, validationResult } = require('express-validator');

const passwordValidationRules = () => {
    return [
        check('senha')
            .isLength({ min: 6 })
            .withMessage('A senha deve ter pelo menos 6 caracteres')
            .matches(/\d/)
            .withMessage('A senha deve conter pelo menos um número')
            .matches(/[a-z]/)
            .withMessage('A senha deve conter pelo menos uma letra minúscula')
            .matches(/[A-Z]/)
            .withMessage('A senha deve conter pelo menos uma letra maiúscula')
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage('A senha deve conter pelo menos um caractere especial'),
    ];
};

const validatePassword = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    passwordValidationRules,
    validatePassword,
};
