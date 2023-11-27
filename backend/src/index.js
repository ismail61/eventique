require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const connectToDatabase = require('./internal/db.init');
const projectConfig = require('./config');
const startingMiddleware = require('./middlewares/starting.middleware');
const stripe = require('stripe')('stripe_secret_key')







const bootstrap = async() => {
    const app = express();

    startingMiddleware(app);
    await connectToDatabase();

    // Set trust proxy to enable 'X-Forwarded-For' header
    app.set('trust proxy', true);


    // Use the main router
    app.use(routes);


    //payment system integration
    app.post("/api/create-checkout-session/", async(req, res) => {
        const products = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: product.name
                },
                unit_amount: product.price * 100,
            },
            quantity: 10
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });
        res.json({ id: session.id });
    })


    // unexpected  router hit shows error
    app.all('*', (req, res, next) => {
        next(
            res.status(404).json({ err: `Can't find ${req.originalUrl} on this server!` })
        );
    })

    // listen port
    app.listen(projectConfig.app.port, () => {
        console.log(`Server is running at ${projectConfig.app.port}`)
    });

    // Error handle
    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err.name, err.message);
    });

    process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    });
    process.on('uncaughtException', err => {
        console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
        console.log(err.name, err.message);
    });
};

(async() => {
    await bootstrap();
})();