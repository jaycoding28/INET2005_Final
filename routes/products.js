const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/all', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { product_id: parseInt(id) },
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

router.post('/purchase', async (req, res) => {
    const { product_id, customer_id, quantity } = req.body;

    if (!product_id || !customer_id || !quantity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { product_id: Number(product_id) }, 
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            message: `Purchase successful for ${quantity} units of ${product.name}`,
        });
    } catch (error) {
        console.error('Error in /purchase:', error);
        res.status(500).json({ error: 'Failed to process purchase' });
    }
});


module.exports = router;


// References:
// RESTful API design: https://restfulapi.net/
// Prisma CRUD operations: https://www.prisma.io/docs/concepts/components/prisma-client/crud
// Express routing params: https://expressjs.com/en/guide/routing.html#route-parameters