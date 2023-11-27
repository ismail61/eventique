const stripe = require('stripe')('sk_test_51OH92MJCNpMHXQjsy39avF3RfsmHHERGqTq0JKZRePAo5Ub5w3JLpnLvjkqxpsMNYGkhNmyQGe8kMsHEh4nC2lnk005zyG4uti');

stripe.products.create({
    name: 'Starter Subscription',
    description: '$12/Month subscription',
}).then(product => {
    stripe.prices.create({
        unit_amount: 1200,
        currency: 'usd',
        recurring: {
            interval: 'month',
        },
        product: product.id,
    }).then(price => {
        console.log('Success! Here is your starter subscription product id: ' + product.id);
        console.log('Success! Here is your starter subscription price id: ' + price.id);
    });
});