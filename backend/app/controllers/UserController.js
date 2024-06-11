const UserService = require('../service/UserService');
const { emailValidationRules, validateEmail } = require('../validators/emailValidator');
const { passwordValidationRules, validatePassword } = require('../validators/passwordValidator');

const createUser = [
    emailValidationRules(),
    passwordValidationRules(),
    validateEmail,
    validatePassword,
    async (req, res) => {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const { user, token } = await UserService.loginUser(email, senha);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
};
