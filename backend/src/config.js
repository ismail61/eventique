// Configuration settings for the project
const projectConfig = {
    app: {
        port: parseInt(process.env.PORT) || 3001, // Port on which the server will run
    },
    db: { 
        url: process.env.MONGODB_URI || 'mongodb+srv://samnadnofail:kuNNeLfFPw79onMv@cluster0.kc6vjby.mongodb.net/eventique', // MongoDB connection URL
    },
    jwt: {
        key: process.env.JWT_SECRET_KEY || 'secret', // Secret key for JWT (JSON Web Tokens)
        expire: process.env.JWT_COOKIE_EXPIRES_IN || '7d', // JWT expiration duration
    },
    frontend: {
        baseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000', // Base URL for the frontend
    },
    stripe: {
        privateKey: process.env.STRIPE_PRIVATE_KEY || '', // Stripe private key
    },
    email: {
        address: process.env.EMAIL_ADDRESS || '',
        password: process.env.EMAIL_PASSWORD || '',
    }
};

// Export the project configuration object
module.exports = projectConfig;
