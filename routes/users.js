const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const passwordValidator = require('password-validator');

const router = express.Router();
const prisma = new PrismaClient();


const schema = new passwordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits();

router.post('/signup', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    
    if (!schema.validate(password)) {
        return res.status(400).json({ 
            error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.customer.create({
            data: { email, password: hashedPassword, first_name, last_name },
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

router.post(
    '/login',
    body('email').isEmail(),
    body('password').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await prisma.customer.findUnique({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            
            
            req.session.user = {
                customer_id: user.customer_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            };
            
            res.status(200).json({ message: 'Login successful', user: req.session.user });
        } catch (err) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }
);

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

router.get('/getSession', (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

module.exports = router;

// Reference: https://express-validator.github.io/docs (Express Validator)
// Reference: https://www.npmjs.com/package/password-validator (Password Validator)
// Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference (Prisma Client API)