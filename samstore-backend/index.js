const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    { id: 3, name: 'Product 3', price: 20.00 }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'demo' && password === 'password') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/api/orders', (req, res) => {
    const { productId, quantity } = req.body;

    const product = products.find(item => item.id === productId);

    if (!product) {
        res.json({ success: false, message: 'Product not found' });
    } else {
        const totalAmount = product.price * quantity;
        res.json({ success: true, message: `Order placed for ${quantity} ${product.name}(s). Total: $${totalAmount.toFixed(2)}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
