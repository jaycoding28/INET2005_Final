const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

dotenv.config();

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


// References:
// Express.js official docs: https://expressjs.com/en/4x/api.html
// Express static files: https://expressjs.com/en/starter/static-files.html
// Express error handling: https://expressjs.com/en/guide/error-handling.html