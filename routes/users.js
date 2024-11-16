const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
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
            res.status(200).json({ message: 'Login successful', email: user.email });
        } catch (err) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }
);

router.post('/logout', (req, res) => {
    res.send('Logout endpoint - Implement logic here');
});

router.get('/getSession', (req, res) => {
    res.send('Get session endpoint - Implement logic here');
});

module.exports = router;


// References:
// Express routing guide: https://expressjs.com/en/guide/routing.html  
// Bcrypt npm docs: https://www.npmjs.com/package/bcrypt
// Express-validator docs: https://express-validator.github.io/docs/
// Prisma Client docs: https://www.prisma.io/docs/concepts/components/prisma-client