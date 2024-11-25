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
    
    if (!req.session.user) {
        return res.status(401).json({ error: 'Must be logged in to make a purchase' });
    }

    const { 
        street, city, province, country, postal_code,
        credit_card, credit_expire, credit_cvv,
        cart, invoice_amt, invoice_tax, invoice_total 
    } = req.body;

    
    if (!street || !city || !province || !country || !postal_code ||
        !credit_card || !credit_expire || !credit_cvv ||
        !cart || !invoice_amt || !invoice_tax || !invoice_total) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        
        const purchase = await prisma.purchase.create({
            data: {
                customer_id: req.session.user.customer_id,
                street,
                city,
                province,
                country,
                postal_code,
                credit_card,
                credit_expire,
                credit_cvv,
                invoice_amt,
                invoice_tax,
                invoice_total,
                items: {
                    create: cart.split(',').map(productId => {
                        const quantity = cart.split(',').filter(id => id === productId).length;
                        return {
                            product_id: parseInt(productId),
                            quantity: quantity
                        };
                    }).filter((item, index, self) => 
                        index === self.findIndex(t => t.product_id === item.product_id)
                    )
                }
            },
            include: {
                items: true
            }
        });

        res.status(200).json({
            message: 'Purchase successful',
            purchase
        });
    } catch (error) {
        console.error('Error in /purchase:', error);
        res.status(500).json({ error: 'Failed to process purchase' });
    }
});

module.exports = router;


// Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference (Prisma Client API)
// Reference: https://expressjs.com/en/guide/routing.html (Routing in Express)