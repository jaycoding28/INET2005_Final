const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

dotenv.config();

app.use(cors({
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// Reference: https://expressjs.com/en/guide/using-middleware.html (Express Middleware)
// Reference: https://expressjs.com/en/guide/routing.html (Routing in Express)
// Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference (Prisma Client Setup)